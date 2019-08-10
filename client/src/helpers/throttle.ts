export default (callback, delay) => {
    // TODO: give types
    let isThrottled = false,
        args,
        context;

    const wrapper = (...args) => {
        if (isThrottled) {
            args = args;
            context = this;
            return;
        }

        isThrottled = true;
        callback.apply(this, args);

        setTimeout(() => {
            isThrottled = false;
            if (args) {
                wrapper.apply(context, args);
                args = context = null;
            }
        }, delay);
    };

    return wrapper;
};
