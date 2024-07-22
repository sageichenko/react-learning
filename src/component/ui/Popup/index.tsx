import {createPortal} from "react-dom";
import styles from "./popup.module.css";
import cx from 'classnames';
import {useEffect} from "react";
export const Popup = ({
  children,
  onClose,
  onOpen = () => {},
  isOpen = false,
  withOutCloseButton = false,
  title = '',
  id = '',
  domNode = document.body
}: Readonly<{
  children: React.ReactNode;
  onClose: () => void;
  onOpen?: () => void;
  isOpen?: boolean;
  withOutCloseButton?: boolean;
  title?: string;
  id?: string;
  domNode?: Element | DocumentFragment;
}>) => {
  const close = () => onClose();

  useEffect(() => {
    onOpen();

    // some animation logic
  }, [isOpen]);

  return createPortal((
    <div className={ cx(styles.root, {
      [styles.open]: isOpen
    }) }>
      <article className={ styles.content }>
        <header className={ styles.header }>
          { title ? (
            <h3 className={ styles.title }>{ title }</h3>
          ) : null }
          { !withOutCloseButton && (
            <button onClick={ close } className={ styles.close }>Close</button>
          ) }
        </header>
        <main className={ styles.main }>
          { children }
        </main>
      </article>
    </div>
  ), domNode, id)
}
