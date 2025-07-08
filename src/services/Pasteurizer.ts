export interface PasteurizerSettings {
    // (°C) Temperatura de entrada do leite
    milkInputTemp: number,
    // (°C) Temperatura de pasteurização/aquecimento
    milkHeatingTemp: number,
    // (L) Volume de leite introduzido no pasteurizador
    milkVolume: number,
    // Celsius
    milkFreezeTemp: number,
    
    steamTotalMassIn: number;
    
    
    // (h) Duração de todo processo
    duration: number,
    // (%) Eficiência da pasteurização
    // !ATENÇÃO! No momento do cálculo é em decimal e para o usuário será mostrado
    // como porcentagem (%) x/100  
    efficiency: number
}



export class Pasteurizer{
    // CONSTANTES
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
    
    //INPUTS
    private milkInputTemp:number;
    private milkHeatingTemp: number;
    private milkVolume: number;
    private milkFreezeTemp:number;

    private steamTotalMassIn: number;

    private duration: number;
    private efficiency: number;

    constructor(settings: PasteurizerSettings){
        this.milkInputTemp = settings.milkInputTemp;
        this.milkHeatingTemp = settings.milkHeatingTemp;
        this.milkVolume = settings.milkVolume;
        this.milkFreezeTemp = settings.milkFreezeTemp;

        this.steamTotalMassIn = settings.steamTotalMassIn;

        this.duration = settings.duration;
        this.efficiency = settings.efficiency;
    }

    // 1ª m (leite) = V (leite) * p (leite)
    // 2ª Q (leite) = m (leite) * c (leite) * (Tf - Ti)  
    // O: Q - (kJ) Total de energia gasta
    public EnergyConsumedtoHeatMilk():number{
        //CONVERSÕES
        const milkVolumeInM3 = this.milkVolume / 1000;
        const efficiencyInDecimal = this.efficiency / 100;

        // VALORES NECESSÁRIOS
        const milkMass:number = milkVolumeInM3 * Pasteurizer.milkDensity;

        // FORMULAS
        // 1º
        const milkTempDiff:number = this.milkHeatingTemp - this.milkInputTemp;
        const energyConsumed:number = milkMass * Pasteurizer.milkSpecificHeatTemp * milkTempDiff;
        console.log(milkMass)
        // 2º
        const result = energyConsumed / efficiencyInDecimal;

        return result;
    }
    
    // O: Vazão(V) - (L/min) Vazão do leite pasteurizado
    public milkFlowRate():number{
        // CONVERSÕES
        const durationInMin:number = this.duration * 60 
        // FORMULAS
        // 1º
        const result:number = this.milkVolume / durationInMin;
        
        return result;
    }

    // O: (kg/h) Vazão de entrada de vapor
    public steamInputFlowRate():number{
        // FORMULAS
        // 1º Vazão de Massa de Vapor
        const steamMass:number = this.EnergyConsumedtoHeatMilk() / Pasteurizer.steamLatentHeat;
        // 2º Calcular a vazão de entrada de vapor no pasteurizador        
        const result:number = steamMass / this.duration;

        return result;
    }

    // O: (kg/h) Vazão de entrada de água fria
    public freezingWaterInputFlowRate():number{
        // CONVERSÕES
        const milkVolumeInM3 = this.milkVolume / 1000;

        // VALORES NECESSÁRIOS
        const milkMass:number = milkVolumeInM3 * Pasteurizer.milkDensity;

        // DEFINIDOS POR LÊLÊ
        const waterInTemp:number = 2;
        const waterOutTemp:number = 25;
        const milkInTemp = this.milkHeatingTemp; 
        const milkOutTemp = 4.5;

        //FORMULAS
        // 1º Calcular a Energia a Ser Removida do Leite
        const milkTempDiff:number = milkInTemp - milkOutTemp;
        const energyConsumedToFreeze:number = milkMass * Pasteurizer.milkSpecificHeatTemp * milkTempDiff;
        // 2º Calcular a Vazão Mássica de Água Fria
        const waterTempDiff:number = waterOutTemp - waterInTemp;
        const waterMass = (energyConsumedToFreeze) / (Pasteurizer.waterSpecificHeatTemp * waterTempDiff)
        // 3º Calcular a Vazão de Entrada de Água Fria 
        const result:number = waterMass / this.duration;
        return result;
    }

    // O: (m²) Área necessária do trocador de calor
    public requiredAreaToHeatExchanger():number{
        //CONVERSÕES
        const energyConsumedInJoule = this.EnergyConsumedtoHeatMilk() * 1000;
        const durationInSeconds = this.duration * 3600;

        // VALOR NECESSÁRIO
        const potency = energyConsumedInJoule / durationInSeconds;

        // DEFINIDOS POR LÊLÊ
        const waterInTemp:number = 85;
        const waterOutTemp:number = 70;

        //FORMULAS
        // - Diferença de Temperatura Média Logarítmica (ΔTml​)
        const WaterInMilkOutTempDiff = waterInTemp - this.milkHeatingTemp;
        const WaterOutMilkInTempDIff = waterOutTemp - this.milkInputTemp;
        const logTempDiffMean:number = ((WaterOutMilkInTempDIff)-(WaterInMilkOutTempDiff)) / Math.log(WaterInMilkOutTempDiff / WaterOutMilkInTempDIff);
        // - Area necessária
        console.log(potency)
        const result:number = potency / (Pasteurizer.globalHeatExchangeCoef * logTempDiffMean);

        return result;
    }

    // O: (kJ) Perdas térmicas
    public heatLoss():number{
        // Eficiência em decimal (divisão por 100)
        const efficiencyInDecimal = this.efficiency / 100;

        //FORMULA
        const result:number = this.EnergyConsumedtoHeatMilk() * (1 - efficiencyInDecimal);
        return result
    }
}