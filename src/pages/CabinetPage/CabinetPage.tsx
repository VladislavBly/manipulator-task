import { Container, Box, Typography, TextField, Button, Paper } from "@mui/material"
import DisplaySettingsOutlinedIcon from '@mui/icons-material/DisplaySettingsOutlined';
import SettingsEthernetOutlinedIcon from '@mui/icons-material/SettingsEthernetOutlined';
import HistoryIcon from '@mui/icons-material/History';
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {setActive, setCommand, setPickIndex, setHistory, setSpeed} from "../../store/activeGridSlice";
import { setItemIndex } from "../../store/ItemSlice";
import GridComponent from "../../components/gridComponent";
import { useEffect, useState } from "react";
import {Snackbar, Alert} from "@mui/material";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import optimizationCommand from "../../helpers/optimizationCommand";
import Grid from '@mui/material/Grid2';

function CabinetPage() {  
    const commonStyle = { width:'90%', mb:2}; // Пример фиксированной ширины
    const titleStyle = { width:'90%', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }; // Объединение стилей для выравнивания
    const smallInputStyle = { width: '48%', mb: 2 };
    
    const useSelectorTypped: TypedUseSelectorHook<RootState> = useSelector;

    const dispatch = useDispatch<AppDispatch>();
    const gridState = useSelectorTypped((state) => state.grid);
    const activeGrid = useSelectorTypped((state) => state.activeGrid.active);
    const pickState = useSelectorTypped((state) => state.activeGrid.pick);
    const pickIndex = useSelectorTypped((state) => state.activeGrid.pickIndex);
    const history = useSelectorTypped((state) => state.activeGrid.history);
    const speed = useSelectorTypped((state) => state.activeGrid.speed);
    const rows = gridState.rows // Количество строк
    const columns = gridState.columns // Количество столбцов
    const [commands, setCommands] = useState('');
    const [disable, setDisable] = useState(false)
    const items = useSelectorTypped((state) => state.items.items);
    const [finish, setFinish] = useState(false);
    const [prevItem, setPrevItem] = useState<number[]>();
    const [prevCommand, setPrevCommand] = useState('');
    const [open, setOpen] = useState(false);
    
    
    

    const setAnimationHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(event.target.value);
        dispatch(setSpeed({speed: inputValue}));
    }

    const setActiveGridHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(event.target.value);
        dispatch(setActive({input:inputValue, rows:rows, columns:columns}));
    }
    const setCommandHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toUpperCase();
        const regex = /^[ЛПВНОБ]*$/;

        if (value === '' || regex.test(value)) {
            setCommands(value);
        }
    }
    const commandHandler = async () => {
        if (commands.length > 0) {
            setPrevItem(items);
            setFinish(false);
            setPrevCommand(commands);
            const commandArr = commands.split('');
            setDisable(true);
            
            for (const command of commandArr) {
                setCommands(prev => prev.slice(1));
                dispatch(setCommand({ input: command, rows:rows, columns:columns}));
                
                await new Promise(resolve => setTimeout(resolve, speed));
            }
            }
        setOpen(true);
        setDisable(false);
        setFinish(true);
    };

    
 
    useEffect(() => {
        if(pickState){
            dispatch(setItemIndex({ index: pickIndex, position: activeGrid, isRemove: pickState }));
        }
    },[activeGrid])

    useEffect(() => {
        if(finish){
            const optimizationeddCommand = optimizationCommand(prevCommand);
            dispatch(setHistory({ command: prevCommand, items: items.join(','), prevItems: prevItem.join(','), optimizationedCommand: optimizationeddCommand}))  
        }

        console.log(history)
    },[finish])

    useEffect(() => {
        const pickIndexx = items.indexOf(activeGrid)
        dispatch(setPickIndex({pickIndex:pickIndexx}))
    },[pickState])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return(
    <Container 
        component='section'
        maxWidth="lg"
        sx={{
            minHeight:'100vh',
            bgcolor: 'transparent',
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            gap:2,
            
        }} 
    >
    <GridComponent />
    
    <Box
    component='aside' 
    sx={{
        width:500,
        height:650,
        bgcolor: 'white',
        borderRadius:5,
        boxShadow:1,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        p:5
    }}>
        <Typography variant="h5" component="h3" sx={titleStyle}>
        <SettingsEthernetOutlinedIcon />
            Ввод команды
        </Typography>
        
        <TextField
            type="text"
            label="Команда"
            variant="standard"
            sx={commonStyle}
            value={commands}
            disabled={disable}
            onChange={setCommandHandler}
        />
        <Button
            onClick={commandHandler} 
            variant="contained" 
            sx={commonStyle} 
            disabled={disable}
            >Отправить</Button>
        <Typography variant="h5" component="h3" sx={titleStyle}>
        <DisplaySettingsOutlinedIcon />
            Настройки
        </Typography>
        <Box sx={{width:'90%', display:'flex', justifyContent:'space-between'}}>
        <TextField
            type="number"
            label="Скорость"
            variant="standard"
            slotProps={{
                htmlInput: {step:100}, 
              }}
            value={speed}
            onChange={setAnimationHandler}
            sx={smallInputStyle}
            disabled={disable}
            
        />
        <TextField
            type="number"
            label="Active"
            variant="standard"
            slotProps={{
                htmlInput: {step: 1},
            }}
            value={activeGrid}
            onChange={setActiveGridHandler}
            disabled={disable}
            
            sx={smallInputStyle}
        />
        </Box>
        <Box sx={{width:'90%', display:'flex', justifyContent:'space-between'}}>
       
        
        <Typography variant="h5" component="h3" sx={titleStyle}>
        <HistoryIcon />
            История
        </Typography>
        
        </Box>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Команда</TableCell>
                        <TableCell>Дата / Время</TableCell>
                        <TableCell>Образцы</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history.map((item, index) => {
                        
                        return(
                        <TableRow key={index}>
                            <TableCell>{item.command} -&gt; {item.optimizationedCommand}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.items} -&gt; {item.prevItems}</TableCell>
                        </TableRow>
                        )
})}
                </TableBody>
            </Table>
        </TableContainer>
        
        <Snackbar 
                open={open} 
                autoHideDuration={5000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Команда выполнена!
                </Alert>
            </Snackbar>

        </Box>
    </Container>
    )
}
export default CabinetPage
