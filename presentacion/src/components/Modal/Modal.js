import React, { Component } from 'react';
import Portal from '../Portal/Portal';

export default class Modal extends Component {
  render() {
    const { children, toggle, active } = this.props;

    return (
      <Portal>
        {active && (
          <div style={styles.wrapper}>
            <div style={styles.window}>
              <button style={styles.closeBtn} onClick={toggle }>
                X
              </button>
              <div style={styles.content}>{children}</div>
            </div>
          </div>
        )}
      </Portal>
    );
  }
}

const styles = {
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  window: {
    position: 'relative',
    background: '#fff',
    borderRadius: 5, 
    padding: 15,
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
    zIndex: 10,
    minWidth: 600, // Increase the minimum width to allow more space
  },
  content: {
    marginTop: 20, // Add margin to create more space between the close button and content
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
};
