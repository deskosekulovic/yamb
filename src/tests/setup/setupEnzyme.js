import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// There should be a single listener which simply prints to the
// console. We will wrap that listener in our own listener.
const listeners = window._virtualConsole.listeners('jsdomError');
const originalListener = listeners && listeners[0];

window._virtualConsole.removeAllListeners('jsdomError');

window._virtualConsole.addListener('jsdomError', (error) => {
    if (error.type !== 'not implemented' && originalListener) {
        originalListener(error);
    }
    // swallow
});
