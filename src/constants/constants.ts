
export const DEFAULT_VALUES = {
    about: "Пока ничего не рассказал о себе",
    avatar: "https://i.pravatar.cc/300",
    image: "https://i.pravatar.cc/150?img=3",
    email: "user@yandex.ru",
    password: "somestrongpassword",
    user: "user",
}
export const minLength_password = 2 
export const minLength = 1 
export const maxLength_username = 64 
export const maxLength_about = 200  
export const maxLength_wishname = 250  
export const maxLength_description = 1024 
export const maxLength_wishList = 1500 

// export const EMAIL_REGEXP = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/;
// export const URL_REGEXP = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
export const EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9._-]{2,}$/;
export const URL_REGEXP = /^(https?:\/\/)?(([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,})(:[0-9]{1,5})?(\/[^\s]*)?$/;

export const DEFAULT_ERRORS = {
    notFound: {
        statusCode: 404,
        message: 'Объект не найден',
    },
    default: {
        statusCode: 500,
        message: 'Ошибка сервера',
    }
}