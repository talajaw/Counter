import { log } from '../../log.js';
//we'll prevent the execution of 2 components by just wapping one of them with memo..but now if i yry run i don't see improve  the code !! so look at the prop (children contain the name of button "doesn't change" Icon contain name of jsx file not dynamic doesn't change also soooo ...prop if i go to Counter component i look onClick contain function thisss iss!!!! cause this func rendered with this conter component func executes!so every time this state changes even if this function not change but in javascript the object recreated and it will be a different object in memory than before! so for prevent the recreation we can use a speacial hook called 'useCallback' uses with useEEfect and memo to avoid the unnecessary re-execution)
import {memo} from 'react' ;


 const IconButton = memo(function IconButton({ children, icon, ...props }) {
  log('<IconButton /> rendered', 2);

  const Icon = icon;
  return (
    <button {...props} className="button">
      <Icon className="button-icon" />
      <span className="button-text">{children}</span>
    </button>
  );
});

export default IconButton;
