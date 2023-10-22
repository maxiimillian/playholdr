import { Fragment, PropsWithChildren } from 'react';
import styles from '../../styles/blockpage.module.scss';

export interface BlockpageProps extends PropsWithChildren {
  handleClick: () => void;
}

// Creates an opaque background for some kind of form / popup
function Blockpage(props: BlockpageProps) {
  return (
    <Fragment>
      <div onClick={props.handleClick} className={styles['block-container']}></div>
      {props.children}
    </Fragment>
  );
}

export default Blockpage;
