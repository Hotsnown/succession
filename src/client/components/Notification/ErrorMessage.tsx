import React from 'react'

import { Alert, Button } from 'react-bootstrap'

export function ErrorMessage(props: {
    message?: string;
}) {
    return (<Alert variant="danger">
            Failed to load file
        <p>{props.message}</p>
    </Alert>);
}

interface ErrorPopupProps {
    message?: string;
    open: boolean;
    onDismiss: () => void;
}

export function ErrorPopup(props: ErrorPopupProps) {  
    return (
      <>
        <Alert show={props.open} variant="danger">
          <Alert.Heading>How's it going?!</Alert.Heading>
          <p>{props.message}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={props.onDismiss} variant="outline-success">
              Close me y'all!
            </Button>
          </div>
        </Alert>  
      </>
    );
  }
  