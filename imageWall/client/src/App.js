/* eslint-disable no-unused-vars */
import './App.css';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const CDNURL =
  'https://vlkhfonmpxhemogeddze.supabase.co/storage/v1/object/public/images/';

function App() {
  const [email, setEmail] = useState('');
  const [images, setImages] = useState([]);
  const user = useUser();
  const supabase = useSupabaseClient();

  async function getImages() {
    const { data, error } = await supabase.storage
      .from('images')
      .list(user?.id + '/', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      }); // Cooper/
    // data: [ image1, image2, image3 ]
    // image1: { name: "subscribeToCooperCodes.png" }

    // to load image1: CDNURL.com/subscribeToCooperCodes.png -> hosted image

    if (data !== null) {
      setImages(data);
    } else {
      alert('Error loading images');
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      getImages();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function magicLinkLogin() {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
    });
    if (error) {
      alert('Error communicating with Supabase - USE REAL EMAIL ADDRESS !');
      console.log(error);
    } else {
      alert('Check email for Supbase Magic Link :)');
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  async function uploadImage(e) {
    let file = e.target.files[0];
    const { data, error } = await supabase.storage
      .from('images')
      .upload(user.id + '/' + uuidv4(), file);
    if (data) {
      getImages();
    } else {
      console.log(error);
    }
  }

  return (
    <Container align="center" className="container-sm mt-4">
      {user === null ? (
        <>
          <h1>Welcome to ImageWall</h1>
          <Form>
            <Form.Group className="mb-3" style={{ maxWidth: '500px' }}>
              <Form.Label>
                Enter an Email to sign in with Supabase Magic Link
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={() => magicLinkLogin()}>
              Get Magic Link
            </Button>
          </Form>
        </>
      ) : (
        <>
          <h1>Your ImageWall</h1>
          <Button onClick={() => signOut()}>Sign Out</Button>
          <p>Current user: {user.email}</p>
          <p>
            Use the Choose File button below to upload an image to your gallery.
          </p>
          <Form.Group className="mb-3" style={{ maxwidth: '500px' }}>
            <Form.Control
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => uploadImage(e)}
            ></Form.Control>
          </Form.Group>
          <hr />
          <h3>Your Images</h3>
          <Row xs={1} md={3} className="g-4">
            {images.map((image) => {
              return (
                <Col key={CDNURL + user.id + '/' + image.name}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={CDNURL + user.id + '/' + image.name}
                    />
                    <Card.Body>
                      <Button variant="danger">Delete Image</Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </Container>
  );
}

export default App;
