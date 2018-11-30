export default {
    animateElement: function (node, animationClass, animationDuration) {
        node.classList.add(animationClass);
        setTimeout(() => {
            node.classList.remove("shake-animate");
        }, animationDuration);
    }
};
