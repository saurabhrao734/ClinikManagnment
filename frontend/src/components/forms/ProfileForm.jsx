import {
  Grid,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Box
} from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    mobile_no: "",
    email: "",
    password: "",
    role: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const { currentUser, setCurrentUser, expirationTime,inputBgColor,formBgColor } =
    useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigator = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (toast.isActive("t1")) {
      toast.closeAll();
    }
    if (!currentUser) {
      toast({
        id: "t1",
        title: "Unauthorized request",
        description: "Login to access this page",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (Date.now() > expirationTime) {
      setCurrentUser(null);
      navigator("/login");
    } else {
      setFormData({
        username: currentUser.username,
        fullname: currentUser.fullname,
        mobile_no: currentUser.mobile_no,
        email: currentUser.email,
      });
      setAvatarUrl(currentUser.avatar);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsChanged(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (toast.isActive("t1")) {
      toast.closeAll();
    }
    if (isChanged == false) {
      toast({
        id: "t1",
        title: "Bad request",
        description: "Change some details for updating your profile",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    } else {
      axios
        .post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/updateProfile`, {
          ...formData,
          role: currentUser.role,
        })
        .then((response) => {
          toast({
            id: "t1",
            title: "Updated Successfully",
            description: "Your profile updated successfully.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          setCurrentUser(response?.data?.data);
          setIsLoading(false);
        })
        .catch((error) => {
          if (error.response.status == 400) {
            toast({
              id: "t1",
              title: "Error",
              description: "All fields are required.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            setIsLoading(false);
          } else {
            toast({
              id: "t1",
              title: "Server error",
              description: "Something went wrong.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            setIsLoading(false);
          }
        });
    }
  };

  const handleAvatarChange = () => {
    if (toast.isActive("t1")) {
      toast.closeAll();
    }
    setIsLoading(true);
    const profileData = new FormData();
    profileData.set("avatar", avatar);
    axios
      .post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/changeAvatar`,
        profileData
      )
      .then((res) => {
        setAvatarUrl(res.data.data.avatar);
        setIsLoading(false);
        toast({
          id: "t1",
          title: "Updated Successfully",
          description: "Avatar updated successfully.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setCurrentUser(res.data.data);
        setAvatar(null);
      })
      .catch((err) => {
        setIsLoading(false);
        if (avatar && err.response.status == 400) {
          toast({
            id: "t1",
            title: "Server error",
            description: "Something went wrong.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            id: "t1",
            title: "Bad request",
            description: "Select picture to set avatar",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
        setAvatarUrl(currentUser.avatar);
      });
  };

  return (
    <Box p={10} h="100svh">
      <Grid templateColumns="30% 70%" alignItems="center" backgroundColor={formBgColor}>
        <FormControl
          w="100%"
          h="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
          px={10}
          gap={3}
        >
          <FormLabel fontSize="2xl">Profile Picture</FormLabel>
          <Avatar width="250px" height="250px" src={avatarUrl} />
          <Input
            bg={inputBgColor}
            type="file"
            opacity={0}
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              setAvatarUrl(URL.createObjectURL(e.target.files[0]));
            }}
            position="absolute"
            width="100%"
            height="100%"
          />
          {avatar && (
            <>
              <Button
                colorScheme="teal"
                variant="outline"
                w="100%"
                onClick={handleAvatarChange}
                isLoading={isLoading}
                loadingText="Uploading"
              >
                Upload
              </Button>
              <Button
                w="100%"
                colorScheme="red"
                onClick={() => setAvatarUrl(currentUser?.avatar)}
              >
                Cancel
              </Button>
            </>
          )}
        </FormControl>

        <Flex
          direction="column"
          as="form"
          onSubmit={handleSubmit}
          gap={3}
          p="10%"
        >
          <FormControl>
            <FormLabel m={0}>Username</FormLabel>
            <Input
              bg={inputBgColor}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              borderColor="cyan.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel m={0}>Full Name</FormLabel>
            <Input
              bg={inputBgColor}
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              borderColor="cyan.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel m={0}>Role</FormLabel>
            <Input
              bg={inputBgColor}
              type="text"
              name="username"
              value={currentUser.role.toUpperCase()}
              disabled
              borderColor="cyan.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel m={0}>Mobile Number</FormLabel>
            <Input
              bg={inputBgColor}
              type="text"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              borderColor="cyan.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel m={0}>Email</FormLabel>
            <Input
              bg={inputBgColor}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              borderColor="cyan.500"
            />
          </FormControl>
          <Button
            type="submit"
            isLoading={isLoading}
            loadingText="Updating"
            colorScheme="cyan"
            color="white"
            borderColor="cyan.500"
          >
            Update Profile
          </Button>
        </Flex>
      </Grid>
    </Box>
  );
};

export default ProfileForm;
