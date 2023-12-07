import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const SessionTimeout = () => {
  const navigate = useNavigate();
  const [sessionTimeout, setSessionTimeout] = useState(2 * 60 * 1000); // 30 minutes in milliseconds
  const [timeLeft, setTimeLeft] = useState(sessionTimeout / 1000);
  const [showNotification, setShowNotification] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const redirectToLogin = () => {
    navigate('/signin');
  };

  useEffect(() => {
    let timeoutId;
    let intervalId;

    const resetSession = () => {6
      setSessionTimeout(2 * 60 * 1000);
      setTimeLeft(sessionTimeout / 1000);
      setShowNotification(false);
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      startSession();
    };

    const startSession = () => {
      timeoutId = setTimeout(() => {
        // Session expired, perform logout or other actions
        resetSession();
        setShowModal(true);
      }, sessionTimeout);

      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);

        // Show notification 5 minutes before session expiration
        if (timeLeft === 300) {
          setShowNotification(true);
        }
      }, 1000);
    };

    startSession();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [sessionTimeout, timeLeft, navigate]);

  const handleClose = () => {
    setShowModal(false);
    redirectToLogin();
  };

  return (
    <div>
      {showNotification && (
        <div>
          Session will expire in 5 minutes. Please save your work!
        </div>
      )}
      <div>
        Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Session Expired</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your session has expired. Please log in again.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SessionTimeout;
