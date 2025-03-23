module.exports = {
    // Status codes
    SUCCESS_CODE: 200,
    ERROR_CODE: 500,
  
    // Status labels (success or error)
    SUCCESS_STATUS: 'success',
    ERROR_STATUS: 'error',
  
    // Success Messages
    SUCCESS_MESSAGE: 'Request completed successfully.',
    USER_FETCHED_MESSAGE: 'User details fetched successfully.',
    USER_CREATED_MESSAGE: 'User has been successfully created.',
    USER_UPDATED_MESSAGE: 'User details have been successfully updated.',
    
    // Error Messages
    ERROR_MESSAGE: 'Something went wrong. Please try again.',
    ERROR_FETCHING_MESSAGE: 'Error fetching user details. Please try again later.',
    USER_NOT_FOUND_MESSAGE: 'No user details found. Please make sure the user exists.',
    ERROR_CREATING_USER: 'Error occurred while creating the user. Please try again.',
    ERROR_UPDATING_USER: 'Error occurred while updating user details.',
    ERROR_INVALID_INPUT: 'Invalid input. Please check your request data.',
    
    // Other dynamic labels (can be used for various API status messages)
    INVALID_REQUEST: 'Invalid request.',
    UNAUTHORIZED_ACCESS: 'You do not have permission to access this resource.',
  };