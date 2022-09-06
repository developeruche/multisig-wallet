import React, { Component, Fragment, Dispatch, SetStateAction, ReactNode } from 'react';
// ICONS
import { CgClose } from 'react-icons/cg';
// INTERFACES
// import { IBottomSheet } from 'src/interfaces';
// CORE COMPONENTS
import { Portal } from '../../portal';


export interface IBottomSheet {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  heading?: string;
  showCloseBtn: boolean;
  children?: ReactNode;
  onClose: () => void;
}


class BottomSheet extends Component<{children: any}> {
  static Cover = (_props: IBottomSheet) => {
    return _props.isOpen ? (
      <div className="bottom-sheet">
        <div className="bottom-sheet__overlay animate__animated animate__fadeIn">
          <div className="bottom-sheet__cover animate__animated animate__slideInUp bottom-sheet__delay">
            {_props.heading !== undefined && (
              <div className="bottom-sheet__header">
                <div className="bottom-sheet__cover-panel" />

                <div className="bottom-sheet__header-title color-text-gray-dark">
                  {_props.heading && _props.heading}
                </div>

                {_props.showCloseBtn && (
                  <button
                    onClick={_props.onClose}
                    className="bottom-sheet__header-close"
                  >
                    <CgClose
                      size={18}
                      color={'#333333'}
                      className="app-modal__header-close-icon"
                    />
                  </button>
                )}
              </div>
            )}

            <div className="bottom-sheet__content">{_props.children}</div>
          </div>
        </div>
      </div>
    ) : null;
  };

  render() {
    return (
      <Fragment>
        <Portal target="#app-bottom-sheet">{this.props.children}</Portal>
      </Fragment>
    );
  }
}

export { BottomSheet as default };
