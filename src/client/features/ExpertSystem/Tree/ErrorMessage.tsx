import React from 'react'

import { Message, Portal } from 'semantic-ui-react';

/** Shows an error message in the middle of the screen. */
export function ErrorMessage(props: {
    message?: string;
}) {
    return (<Message negative className="error">
        <Message.Header>
            Failed to load file
        </Message.Header>
        <p>{props.message}</p>
    </Message>);
}

interface ErrorPopupProps {
    message?: string;
    open: boolean;
    onDismiss: () => void;
}

/**
 * Shows a dismissable error message in the bottom left corner of the screen.
 */
export function ErrorPopup(props: ErrorPopupProps) {
    return (<Portal open={props.open} onClose={props.onDismiss}>
        <Message negative className="errorPopup" onDismiss={props.onDismiss}>
            <Message.Header>
                Error
            </Message.Header>
            <p>{props.message}</p>
        </Message>
    </Portal>);
}
