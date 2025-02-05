import dotenv from 'dotenv';

export const envLoader = (env = "dev") => {
    switch (env) {
        case "test":
            // Load test env file
            return dotenv.config({
                path: ".env.test",
            });
        case "dev":
            // TODO: Load dev env file
            break;
        case "prod":
            // TODO: Load prod env file
            break;
        default:
            // TODO: Load dev env file
            break;
    }
}
