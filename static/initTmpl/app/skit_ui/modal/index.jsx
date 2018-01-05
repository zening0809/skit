import Modal, { ModalFuncProps } from './Modal';
import confirm from './confirm';
import './style/index';

export { ActionButtonProps } from './ActionButton';
export { ModalProps, ModalFuncProps } from './Modal';

Modal.info = function (props) {
    const config = {
        type: 'info',
        iconType: 'info-circle',
        okCancel: false,
        ...props,
    };
    return confirm(config);
};

Modal.success = function (props) {
    const config = {
        type: 'success',
        iconType: 'check-circle',
        okCancel: false,
        ...props,
    };
    return confirm(config);
};

Modal.error = function (props) {
    const config = {
        type: 'error',
        iconType: 'cross-circle',
        okCancel: false,
        ...props,
    };
    return confirm(config);
};

Modal.warning = Modal.warn = function (props) {
    const config = {
        type: 'warning',
        iconType: 'exclamation-circle',
        okCancel: false,
        ...props,
    };
    return confirm(config);
};

Modal.confirm = function (props) {
    const config = {
        type: 'confirm',
        okCancel: true,
        ...props,
    };
    return confirm(config);
};

export default Modal;

// <div>
//     <Button type="danger" onClick={this.showModal}>Open</Button>
//     <Modal
//         title="Basic Modal"
//         visible={this.state.visible}
//         onOk={this.handleOk}
//         onCancel={this.handleCancel}
//         footer={null}
//         width={740}
//     >
//     </Modal>
// </div>
