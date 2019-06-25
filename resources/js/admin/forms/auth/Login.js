import Form from '../../base/Form';

export default class Login extends Form
{
    username = '';
    password = '';
    remember = false;

    /**
     * Validation rules
     * @type {{
     * password: {required: boolean},
     * username: {max: number, exists: {col: string, table: string}, alpha_dash: boolean, required: boolean}}}
     */
    rules = {
        username: {
            required: true,
            exists: {
                table: 'admins',
                col: 'username'
            },
            alpha_dash: true,
            max: 255
        },
        password: {
            required: true,
            string: true
        }
    };
}
