import {Modal, Button} from 'react-bootstrap'
import axios from "axios"


function ModalBox(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>new password</h4>
          <p>
            click send and a new password will be set and sent to you via sms and email
          </p>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={props.onHide} size={'sm'}
        variant="light" onClick={props.axiosFunc}>send</Button>
          <Button onClick={props.onHide} size={'sm'}
          variant="light">cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default ModalBox