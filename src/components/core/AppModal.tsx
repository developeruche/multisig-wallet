import classnames from 'classnames';
import React, { Component, Fragment, Dispatch, SetStateAction, ReactNode } from 'react';
// ICONS
import { CgClose } from 'react-icons/cg';

import { Portal } from '../../portal';

interface IChildren {
  children: ReactNode;
}

interface IAppModalHeader {
  heading?: string;
  showCloseBtn: boolean;
  onClose?: () => void;
}

interface IAppModal {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  children?: ReactNode;
}


interface Icontent extends IChildren {
  variant: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

class AppModal extends Component<{children: any}> {
  static Header = (_props: IAppModalHeader) => {
    return (
      <div className="app-modal__header flex justify-between">
        <div className="fw-bold text-lg md:text-3xl app-modal__header-heading">
          {_props.heading && _props.heading}
        </div>

        {_props.showCloseBtn && (
          <button onClick={_props.onClose} className="app-modal__header-close">
            <CgClose
              className="app-modal__header-close-icon"
            />
          </button>
        )}
      </div>
    );
  };

  static Content = (_props: Icontent) => {
    const contentClassnames = {
      'app-modal__content--xs': _props.variant === 'xs',
      'app-modal__content--sm': _props.variant === 'sm',
      'app-modal__content--md': _props.variant === 'md',
      'app-modal__content--lg': _props.variant === 'lg',
      'app-modal__content--xl': _props.variant === 'xl',
      'app-modal__content--2xl': _props.variant === '2xl',
      'app-modal__content--full': _props.variant === 'full',
    };

    return (
      <div className={classnames('app-modal__content', contentClassnames)}>
        <div className="app-modal__body">{_props.children}</div>
      </div>
    );
  };

  static Footer = (_props: IChildren) => (
    <div className="app-modal__footer">{_props.children}</div>
  );

  static Cover = (_props: IAppModal) => {
    const coverClassnames = {
      'app-modal--xs': _props.variant === 'xs',
      'app-modal--sm': _props.variant === 'sm',
      'app-modal--md': _props.variant === 'md',
      'app-modal--lg': _props.variant === 'lg',
      'app-modal--xl': _props.variant === 'xl',
      'app-modal--2xl': _props.variant === '2xl',
      'app-modal--full': _props.variant === 'full',
      // animate__zoomIn: _props.isOpen === true,
      // animate__zoomOut: _props.isOpen === false,
    };

    const overlayClassnames = {
      // animate__fadeIn: _props.isOpen === true,
      // animate__fadeOut: _props.isOpen === false,
    };

    return _props.isOpen ? (
      <div className="app-modal">
        <div className={classnames('app-modal__overlay', overlayClassnames)}>
          <div
            className={classnames(
              'app-modal__cover app-modal-delay',
              coverClassnames
            )}
          >
            {_props.children}
          </div>
        </div>
      </div>
    ) : null;
  };

  render() {
    return (
      <Portal target="#app-modal-root">
        <Fragment>{this.props.children}</Fragment>
      </Portal>
    );
  }
}

export { AppModal as default };
