export const responseWrapper = ({ isSuccess = true, message = "success", data }: { isSuccess?: boolean, message?: string, data?: any }) => {
    return {
        success: isSuccess,
        message: message,
        data: data
    };
}
