export interface PasteurizerSettings {
    // (°C) Temperatura de entrada do leite
    milkInputTemp: number,
    // (°C) Temperatura de pasteurização/aquecimento
    milkHeatingTemp: number,
    // (L) Volume de leite introduzido no pasteurizador
    milkVolume: number,
    
    
    steamTotalMassIn: number;
    
    
    // (h) Duração de todo processo
    duration: number,
    // (%) Eficiência da pasteurização
    // !ATENÇÃO! No momento do cálculo é em decimal e para o usuário será mostrado
    // como porcentagem (%) x/100  
    efficiency: number
}



export class Pasteurizer{
    // kJ/(kg*°C) Calor específico do leite
    public static readonly milkSpecificHeatTemp = 3.9;
    // (kg/m³) Densidade do leite
    public static readonly milkDensity = 1030;
    // kJ/(kg*°C) Calor específico do leite
    public static readonly waterSpecificHeatTemp = 4.18;
    // (kJ/kg) Calor específico do leite
    public static readonly steamLatentHeat = 2257; 
    // (kg/m³) Densidade do vapor a 2 atm
    public static readonly steamDensity = 0.943; 
    // U - W/(m².°C) Coeficiente global de troca térmica
    public static readonly globalHeatExchangeCoef = 3000; 

    private milkInputTemp:number;
    private milkHeatingTemp: number;
    private milkVolume: number;

    private steamTotalMassIn: number;

    private duration: number;
    private efficiency: number;

    constructor(settings: PasteurizerSettings){
        this.milkInputTemp = settings.milkInputTemp;
        this.milkHeatingTemp = settings.milkHeatingTemp;
        this.milkVolume = settings.milkVolume;

        this.steamTotalMassIn = settings.steamTotalMassIn;

        this.duration = settings.duration;
        this.efficiency = settings.efficiency;
    }

    // 1ª m (leite) = V (leite) * p (leite)
    // 2ª Q (leite) = m (leite) * c (leite) * (Tf - Ti)  
    // O: Q - (kJ) Total de energia gasta
    public EnergyConsumedtoHeatMilk():number{
        const milkDensistyByLiter:number = Pasteurizer.milkDensity/1000;
        const milkMass:number = this.milkVolume * milkDensistyByLiter;
        const tempVariation:number = this.milkHeatingTemp - this.milkInputTemp;
        const energyConsumed:number = milkMass * Pasteurizer.milkSpecificHeatTemp * tempVariation
        
        // convertido de joule para kiloJoule
        const result:number = energyConsumed / 1000
        
        return result;
    }
    
    // O: V - (L/min) Vazão do leite pasteurizado
    public milkFlowRate():number{
        const durationInMinutes:number = this.duration * 60 
        const result:number = this.milkVolume / durationInMinutes;
        return result;
    }

    // O: (m3/s) Vazão de entrada de vapor
    public steamInputFlowRate():number{
        // reconverter a energia consumida para joule (multiplica-se por 1000)
        const steamMass:number = (this.EnergyConsumedtoHeatMilk() * 1000) / Pasteurizer.steamLatentHeat;
        const steamFlow:number = steamMass / Pasteurizer.steamDensity;
        const steamFlowByDuration:number = steamFlow / this.duration;
        // conversão para segundos
        const result:number = steamFlowByDuration / 3600
        return result;
    }

    // O: (m3/s) Vazão de saída de vapor

    public steamOutputFlowRate():number{
        // reconverter a energia consumida para joule (multiplica-se por 1000)
        const condensedSteamMass:number = (this.EnergyConsumedtoHeatMilk() * 1000) / Pasteurizer.steamLatentHeat;
        const steamTotalMassOut:number = this.steamTotalMassIn - condensedSteamMass;
        const steamFlowRate:number = steamTotalMassOut / Pasteurizer.steamDensity;
        // (m³/h -> m³/s) conversão para segundos
        const result:number = steamFlowRate / 3600;
        return result;
    }

    // O: (m²) Área necessária do trocador de calor

    public requiredAreaToHeatExchanger():number{
        const waterInTemp:number = 85;
        const waterOutTemp:number = 70;

        const logarithmicTempDifferenceMean:number = ((waterInTemp - this.milkHeatingTemp) - (waterOutTemp - this.milkInputTemp)) / Math.log(((waterInTemp - this.milkHeatingTemp) / (waterOutTemp - this.milkInputTemp)));

        const result:number = this.EnergyConsumedtoHeatMilk() / Pasteurizer.globalHeatExchangeCoef * logarithmicTempDifferenceMean;

        return result;
    }

    // O: (kJ) Perdas térmicas
    public heatLoss():number{
        // reconverter a energia consumida para joule (multiplica-se por 1000)
        const energyConsumedInJoule = this.EnergyConsumedtoHeatMilk() * 1000;
        // ademais eficiência em decimal (divisão por 100)
        const efficiencyInDecimal = this.efficiency / 100;

        const energyProvided:number = energyConsumedInJoule / efficiencyInDecimal;
        // energia fornecida convertida em kiloJoule (multiplica-se por 1000)
        console.log(energyProvided)
        const result:number = energyProvided * (1 - efficiencyInDecimal);
        return result / 1000;
    }

}