import React, { useState, useRef } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import AuthAPI from "../api/Auth"; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [emailSent, setEmailSent] = useState(false);
  const inputRefs = useRef([]);

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    const newUser = {
        userEmail: email,
    };
    try{
        console.log("Email submitted:", email);

        const response = await AuthAPI.authenticate(newUser);
        if(response.status === 200){
            setEmailSent(true);
            console.log("response was ok")
        }
    }
    catch (e){

    }
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleCodeSubmit = async (event) => {
    
    event.preventDefault();
    const newUser = {
        userEmail: email,
        userCode: code.join(""),
    };
    console.log(newUser);
    try{
        console.log("Code submitted:", code.join(""));

        const response = await AuthAPI.authorize(newUser)
                console.log(response)
                if(response.status === 200){
                    console.log("user is authorized!");
                    
                    localStorage.setItem("authToken", response.data.token);
                    console.log(localStorage.getItem("authToken"));
                    window.location.href = "/";
                }
            }
            catch (e){
              console.log(e);
            }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        component="form" 
        onSubmit={emailSent ? handleCodeSubmit : handleEmailSubmit} 
        sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}
      >
        <Typography variant="h5" component="h1" align="center">
          {emailSent ? "Enter Verification Code" : "Login"}
        </Typography>
        {!emailSent ? (
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {code.map((digit, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                type="text"
                variant="outlined"
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                sx={{ width: 40 }}
              />
            ))}
          </Box>
        )}
        <Button type="submit" variant="contained" fullWidth>
          {emailSent ? "Verify" : "Send Code"}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
