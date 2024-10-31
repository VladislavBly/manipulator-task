import { Box, Typography, TextField,Button } from "@mui/material"
import style from './style.module.css'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from "react-router-dom";

type LoginFormValues = {
    login: string;
    password: string;
};

function LogInPage() {  
    const navigate = useNavigate();
    const { handleSubmit, control, setError ,formState: { errors } } = useForm<LoginFormValues>();
    const commonStyle = { width: '250px' }; // Пример фиксированной ширины


    const onSubmit = (data: LoginFormValues) => {
        const { login, password } = data;
        if( login === 'admin' && password === 'admin') {
            navigate('/cabinet')
        }else{
            setError("login", { type: "manual", message: "Неверный логин" });
            setError("password", { type: "manual", message: "Неверный пароль" });
        }
    };
    return (
    <Box  component='form' onSubmit={handleSubmit(onSubmit)} className={style.LogInBlock} sx={
        {
            height:350, 
            width:400,
            bgcolor:'white', 
            borderRadius:5,
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            alignContent:'center',
            justifyContent:'center',
            gap:2
        }}>
        <Typography variant='h4' component='h3'>Войти</Typography>
        <Controller
            name='login'
            control={control}
            rules={{ required: 'Введите логин' }}
            render={({ field }) => (
                <TextField 
                    {...field}
                    sx={commonStyle}
                    id='login' 
                    type='text' 
                    label='Логин' 
                    variant='standard' 
                    error={!!errors.login}
                    helperText={errors.login?.message as string}
                    
                />
            )}
        /> 
        <Controller
            name='password'
            control={control}
            rules={{ required: 'Введите пароль' }}
            render={({ field }) => (
                <TextField 
                    {...field} 
                    sx={commonStyle} 
                    id='password' 
                    type='password' 
                    label='Пароль'  
                    variant='standard' 
                    error={!!errors.password}
                    helperText={errors.login?.message as string}
                />
            )}
        />
        <Button 
            type='submit' 
            size="large"  
            variant="contained"
            sx={commonStyle} 
        >
            Войти
        </Button>
    </Box>
)
}
export default LogInPage
