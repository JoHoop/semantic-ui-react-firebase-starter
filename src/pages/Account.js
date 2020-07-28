import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import {
    Container,
    Button,
    Header,
    Image,
    Input,
    Form,
    Card,
    Modal,
    Checkbox,
    Message,
    Divider,
    Icon,
} from "semantic-ui-react";
import Firebase from "../services/Firebase";
import { UserContext } from "../helpers/UserProvider.js";
import {
    signOut,
    changeUsername,
    changeEmail,
    changePassword,
    changePhoto,
    deleteUser,
    resetPassword,
    verifyEmail,
} from "../helpers/Auth.js";
import { useForm } from "../components/useForm";
import {
    emailIsValid,
    emptyElement,
    stringsEqual,
} from "../helpers/Validators";
import { createUploadTask } from "../helpers/FileHandler";

export default () => {
    const { currentUser } = useContext(UserContext);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const showError = (error) => {
        setErrorMessage(`${error.message} (Code: ${error.code})`);
    };

    const [imageAsFile, setImageAsFile] = useState("");

    const [values, handleChange] = useForm({
        username: currentUser.displayName,
        email: currentUser.email,
        password: "",
        confirmUsername: "",
    });
    const { username, email, password, confirmUsername } = values;

    const handleImageAsFile = (event) => {
        const image = event.target.files[0];
        setImageAsFile((imageFile) => image);
    };

    const handleFileUpload = () => {
        var uploadTask = createUploadTask(currentUser.uid, imageAsFile);

        uploadTask.on(
            Firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                var progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} % done`);
                switch (snapshot.state) {
                    case Firebase.storage.TaskState.PAUSED:
                        console.log(`Upload is paused`);
                        break;
                    case Firebase.storage.TaskState.RUNNING:
                        console.log(`Upload is running`);
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(async (downloadURL) => {
                        try {
                            await changePhoto(downloadURL);
                            setConfirmMessage("Avatar has been set.");
                        } catch (error) {
                            showError(error);
                        }
                    });
            }
        );
    };

    const handleSignOut = async () => {
        signOut();
        return <Redirect to="/signin" />;
    };
    const handleChangeUsername = async () => {
        try {
            await changeUsername(username);
            setConfirmMessage("Username has been set.");
        } catch (error) {
            showError(error);
        }
    };
    const handleChangeEmail = async () => {
        try {
            await changeEmail(email);
            setConfirmMessage("Email has been set.");
        } catch (error) {
            showError(error);
        }
    };
    const handleChangePassword = async () => {
        try {
            await changePassword(password);
            setConfirmMessage("Password has been set.");
        } catch (error) {
            showError(error);
        }
    };
    const handleRemovePhoto = async () => {
        try {
            await changePhoto("");
            setConfirmMessage("Avatar has been removed.");
        } catch (error) {
            showError(error);
        }
    };
    const handleDeleteUser = async () => {
        try {
            await deleteUser();
            return <Redirect to="/signin" />;
        } catch (error) {
            showError(error);
        }
    };
    const handleResetPassword = async () => {
        try {
            await resetPassword(currentUser.email);
            setConfirmMessage(
                "Password reset link has been sent to your email!"
            );
        } catch (error) {
            showError(error);
        }
    };
    const handleVerifyEmail = async () => {
        try {
            await verifyEmail();
            setConfirmMessage("Verification link has been sent to your email");
        } catch (error) {
            showError(error);
        }
    };

    return (
        <>
            <Container style={{ marginTop: "10em" }}>
                <Header as="h1">Hello, {currentUser.displayName}!</Header>
                <p>Manage your account.</p>
                <Button color="teal" onClick={() => handleSignOut()}>
                    Sign out
                </Button>
                <br />
                <br />
                <Message
                    color="teal"
                    hidden={!confirmMessage}
                    header={confirmMessage}
                />
                <Message error hidden={!errorMessage} header={errorMessage} />
                <Divider />
                <Header as="h2">Edit username or email</Header>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Username</label>
                            <Input
                                iconPosition="left"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                fluid
                            >
                                <Icon name="user" />
                                <input />
                                <Button
                                    color="teal"
                                    disabled={stringsEqual(
                                        username,
                                        currentUser.displayName
                                    )}
                                    onClick={() => handleChangeUsername()}
                                >
                                    Set
                                </Button>
                            </Input>
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <Input
                                iconPosition="left"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                fluid
                            >
                                <Icon name="at" />
                                <input />
                                <Button
                                    color="teal"
                                    disabled={
                                        stringsEqual(
                                            email,
                                            currentUser.email
                                        ) || !emailIsValid(email)
                                    }
                                    onClick={() => handleChangeEmail()}
                                >
                                    Set
                                </Button>
                            </Input>
                        </Form.Field>
                        <Form.Field>
                            <label>ID</label>
                            <Input
                                icon="id card"
                                iconPosition="left"
                                placeholder="ID"
                                defaultValue={currentUser.uid}
                                fluid
                                readOnly
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
                <br />
                <Divider />
                <Header as="h2">Change password</Header>
                <Form>
                    <Form.Group widths="equal">
                        <Form.Field>
                            <label>Old password</label>
                            <Input
                                fluid
                                icon="lock"
                                iconPosition="left"
                                placeholder="Old password"
                                type="password"
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>New password</label>
                            <Input
                                iconPosition="left"
                                placeholder="New password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={password}
                                fluid
                            >
                                <Icon name="lock" />
                                <input />
                                <Button
                                    color="teal"
                                    disabled={emptyElement([
                                        password,
                                        currentUser.password,
                                    ])}
                                    onClick={() => handleChangePassword()}
                                >
                                    Set
                                </Button>
                            </Input>
                        </Form.Field>
                    </Form.Group>
                </Form>
                <br />
                <Divider />
                <Header as="h2">Reset password</Header>
                <Form>
                    <Form.Field>
                        <Button onClick={() => handleResetPassword()}>
                            Reset by email
                        </Button>
                    </Form.Field>
                </Form>
                <br />
                <Divider />
                <Header as="h2">Verify account</Header>
                <Form>
                    <Form.Field>
                        <Checkbox
                            label={
                                currentUser.emailVerified
                                    ? "You are verified"
                                    : "You are not yet verified"
                            }
                            checked={currentUser.emailVerified}
                            readOnly
                        />
                        <br />
                        <br />
                        {!currentUser.emailVerified && (
                            <Button onClick={() => handleVerifyEmail()}>
                                Send verification email
                            </Button>
                        )}
                    </Form.Field>
                </Form>
                <br />
                <Divider />
                <Header as="h2">Change avatar</Header>
                <Card>
                    <Image src={currentUser.photoURL} alt="avatar" />
                    <Card.Content>
                        <Card.Description>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageAsFile}
                            />
                            <br />
                            <br />
                            <br />
                            <Button
                                color="teal"
                                disabled={!imageAsFile}
                                onClick={() => handleFileUpload()}
                            >
                                Replace
                            </Button>
                            <Button
                                disabled={!currentUser.photoURL}
                                onClick={() => handleRemovePhoto()}
                            >
                                Remove
                            </Button>
                        </Card.Description>
                    </Card.Content>
                </Card>
                <br />
                <Divider />
                <Header as="h2">Delete account</Header>
                <Modal
                    trigger={<Button negative>Delete account</Button>}
                    closeIcon
                >
                    <Modal.Header>Delete account</Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Form>
                                <Form.Group widths="equal">
                                    <Form.Field
                                        control={Input}
                                        label="Do you really want to delete your user account?"
                                        placeholder="Type username to confirm"
                                        name="confirmUsername"
                                        value={confirmUsername}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button>Cancel</Button>
                        <Button
                            onClick={() => handleDeleteUser()}
                            negative
                            disabled={
                                !stringsEqual(
                                    confirmUsername,
                                    currentUser.displayName
                                )
                            }
                        >
                            Delete team
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Container>
        </>
    );
};
