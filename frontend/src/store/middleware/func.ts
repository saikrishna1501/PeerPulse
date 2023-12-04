
const func = (store: any) => (next: any) => (action: any) => {

    // check if action is function then execute that function else go to next middleware
    if(typeof action === 'function')
        action(store);
    else
        next(action);
}

export default func;