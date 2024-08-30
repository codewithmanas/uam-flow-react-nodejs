import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

  /** 
   * Handles the submission of the registration form.
   * @param {React.FormEvent<HTMLFormElement>} e - The form event.
   * @returns {Promise<void>} - A promise that resolves when the registration has been processed.
   */
  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await axios.post<{ message: string }>(
        'http://localhost:5000/api/auth/register',
        { email, password }
      );
      alert('Registration successful');
    } catch (err) {
      // console.error(err);
      console.error(err.response.data.message);
    }
  };
  return (
    <form onSubmit={handleRegister}>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {/* <button type="submit">Register</button> */}
      <Button type="submit">Register Now!</Button>
    </form>
  )
}

export default RegistrationForm