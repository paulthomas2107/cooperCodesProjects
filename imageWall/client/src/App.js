import './App.css';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const user = useUser();
  const supabase = useSupabaseClient();

  return (
    <Container align="center" className="container-sm mt-4">
      {user === null ? (
        <>
          <h1>Welcome to ImageWall</h1>
          <Form>
            <Form.Group className="mb-3" style={{ maxWidth: '500px' }}>
              <Form.Label>
                Enter an Email to sign in with Supbase Magic Link
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button variant="primary">Get Magic Link</Button>
          </Form>
        </>
      ) : (
        <>
          <h1>Your ImageWall</h1>
        </>
      )}
    </Container>
  );
}

export default App;
