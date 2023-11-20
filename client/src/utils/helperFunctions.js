import { toast } from "react-toastify"

// For testing purposes.
export const promiseThatResolvesAfter3sec = () =>
    new Promise((resolve) => setTimeout(resolve, 3000))

export function debounce(func, delay) {
    let timerId

    return function () {
        const context = this
        const args = arguments

        // Cancel the previous timer
        clearTimeout(timerId)

        // Set up a new timer
        timerId = setTimeout(function () {
            func.apply(context, args)
        }, delay)
    }
}

export const notificationOptions = {
    type: "success",
    position: "bottom-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    bodyStyle: { fontSize: "clamp(12px, 0.6em, 18px)" },
}

export function getLoadingToast(msg) {
    return toast.loading(msg, { ...notificationOptions })
}

export function updateToast(notification, msg) {
    return {
        success() {
            toast.update(notification, {
                ...notificationOptions,
                render: msg,
                type: "success",
                isLoading: false,
            })
        },

        fail() {
            toast.update(notification, {
                ...notificationOptions,
                render: msg,
                type: "error",
                isLoading: false,
            })
        },
    }
}
