
export default function optimizationCommand(command: string):string {
    let count = 1;
    let optimizationedCommand:string = '';
    for (let i = 0; i < command.length; i++) {
        if(command[i] === command[i+1]){
            count++
        }else{
            count == 1 ? optimizationedCommand += `${command[i]}` : optimizationedCommand += `${count}${command[i]}` ;
            count = 1;
        }
    }
    
    if(optimizationedCommand.length == 0){
        return command
    }
    return optimizationedCommand
}