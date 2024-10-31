import { Box, Grid, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import hook from '../assets/magnet.svg';
import flask from '../assets/box.svg';
import style from './style.module.css';
import { motion } from 'framer-motion';
import { setItem} from "../store/ItemSlice";
import { RootState } from "../store/store";


function getRandomInt(min:number, max:number):number {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
  

export default function GridComponent() {
    const useSelectorTypped: TypedUseSelectorHook<RootState> = useSelector;

    const active = useSelectorTypped((state) => state.activeGrid.active);
    const gridState = useSelectorTypped((state) => state.grid);
    const items = useSelectorTypped((state) => state.items.items);
    const rows = gridState.rows; // Количество строк
    const columns = gridState.columns; // Количество столбцов
    const [grid, setGrid] = useState<React.ReactNode>([]);
    const [countItems] = useState(8);
    const dispatch = useDispatch();
    

    useEffect(() => {
        let i = 0;
        while(i < countItems){
            const item = getRandomInt(1, rows * columns)
            if(!(items.includes(item))){
                dispatch(setItem(item))
            }
            console.log(item)
            i++
        } 
    },[])


    const drawGrid = () => {
        const cells = Array.from({ length: rows * columns }, (_, i) => i + 1);
        setGrid(cells.map((cell) => (
            <Grid item xs={12 / columns} key={cell}>
                <Paper sx={{
                    position: 'relative',
                    padding: 2,
                    textAlign: 'center',
                    border: 1,
                    color: '#f0f0f0',
                    height: 60
                }}>
                <Typography>{cell}</Typography>
                {items.includes(cell) ? (
                    <img
                    className={style.flask} src={flask} alt="flask" 
                    />
                ) : null}
                {active === cell ? (
                    <motion.img
                        className={style.hook}
                        src={hook}
                        alt="Hook"
                        initial={{ scale: 0.5, x: "50%", translateX: "-50%" }}
                        animate={{ scale: 1, x: "50%", translateX: "-50%", y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                ) : null}
                </Paper>
            </Grid>
        )));
    };

    // Запускаем drawGrid при изменении строк или столбцов
    useEffect(() => {
        drawGrid();
    }, [active, rows, columns, items]);

    return (
        <Box
            component='main'
            sx={{
                width: 650,
                height: 650,
                bgcolor: 'white',
                borderRadius: 5,
                boxShadow: 1,
                display: 'flex',
                alignContent: 'center',
                padding: 5,
            }}>
            <Grid container
                spacing={1}
                sx={{
                    display: 'flex',
                    alignContent: 'center',
                    marginTop: 2
                }}>
                {grid}
            </Grid>
        </Box>
    );
}
