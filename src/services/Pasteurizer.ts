export interface PasteurizerSettings {
    // (°C) Temperatura de entrada do leite
    milkInputTemp: number,
    // (°C) Temperatura de pasteurização/aquecimento
    milkHeatingTemp: number,
    // (L) Volume de leite introduzido no pasteurizador
    milkVolume: number,
    // Celsius
    milkFreezeTemp: number,
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
    // (kJ/kg) Calor latente de vaporização 
    public static readonly steamLatentHeat = 2257; 
    // U - W/(m².°C) Coeficiente global de troca térmica
    public static readonly globalHeatExchangeCoef = 3000; 

    //INPUTS
    private milkInputTemp:number;
    private milkHeatingTemp: number;
    private milkVolume: number;
    private milkFreezeTemp:number;
    private duration: number;
    private efficiency: number;

    constructor(settings: PasteurizerSettings){
        this.milkInputTemp = settings.milkInputTemp;
        this.milkHeatingTemp = settings.milkHeatingTemp;
        this.milkVolume = settings.milkVolume;
        this.milkFreezeTemp = settings.milkFreezeTemp;
        this.duration = settings.duration;
        this.efficiency = settings.efficiency;

    }
    static floatRound(floatNumber:number, precision: number = 0):number{
        if( precision <= 0){
            return Math.round(floatNumber);
        }
        
        const factor = Math.pow(10, precision);

        return Math.round(floatNumber * factor)/factor
    }
    private get milkMass(): number {
        const milkVolumeInM3 = this.milkVolume / 1000;
        return milkVolumeInM3 * Pasteurizer.milkDensity;
    }
    private _energyConsumedToHeatMilk: number | null = null;


    // 1ª m (leite) = V (leite) * p (leite)
    // 2ª Q (leite) = m (leite) * c (leite) * (Tf - Ti)  
    // O: Q - (kJ) Total de energia gasta
    public EnergyConsumedtoHeatMilk():number{
        if (this._energyConsumedToHeatMilk !== null) {
            return this._energyConsumedToHeatMilk;
        }
        // --- CONVERSÕES ---
        const efficiencyInDecimal = this.efficiency / 100;

        // --- FORMULAS  ---
        // 1º
        // (Tf - Ti),
        const milkTempDiff:number = this.milkHeatingTemp - this.milkInputTemp;
        // Q (leite) = m * c * (Tf - Ti)
        const energyConsumed:number = this.milkMass * Pasteurizer.milkSpecificHeatTemp * milkTempDiff;

        // 2º Calcular a Energia Total Gasta Considerando a Eficiência
        const result = energyConsumed / efficiencyInDecimal;

        this._energyConsumedToHeatMilk = Pasteurizer.floatRound(result, 2);
        return Pasteurizer.floatRound(result, 2);
    }
    
    // O: Vazão(V) - (L/min) Vazão do leite pasteurizado
    public milkFlowRate():number{
        // --- CONVERSÕES ---
        const durationInMin:number = this.duration * 60;

        // --- FORMULAS  ---
        // 1º
        const result:number = this.milkVolume / durationInMin;
        
        return Pasteurizer.floatRound(result, 2);
    }

    // O: (kg/h) Vazão de entrada de vapor
    public steamInputFlowRate():number{
        // --- FORMULAS  ---
        // 1º Vazão de Massa de Vapor
        const steamMass:number = this.EnergyConsumedtoHeatMilk() / Pasteurizer.steamLatentHeat;
        // 2º Calcular a vazão de entrada de vapor no pasteurizador        
        const result:number = steamMass / this.duration;

        return Pasteurizer.floatRound(result, 2);
    }

    // O: (kg/h) Vazão de entrada de água fria
    public freezingWaterInputFlowRate():number{
        // --- DEFINIDOS POR LÊLÊ ---
        const waterInTemp:number = 2;
        const waterOutTemp:number = 25;

        // --- FORMULAS  ---
        // 1º Calcular a Energia a Ser Removida do Leite
        const milkTempDiff:number = this.milkHeatingTemp - this.milkFreezeTemp;
        const energyConsumedToFreeze:number = this.milkMass * Pasteurizer.milkSpecificHeatTemp * milkTempDiff;
        // 2º Calcular a Vazão Mássica de Água Fria
        const waterTempDiff:number = waterOutTemp - waterInTemp;
        const waterMass = (energyConsumedToFreeze) / (Pasteurizer.waterSpecificHeatTemp * waterTempDiff)
        // 3º Calcular a Vazão de Entrada de Água Fria 
        const result:number = waterMass / this.duration;
        return Pasteurizer.floatRound(result, 2);
    }

    // O: (m²) Área necessária do trocador de calor
    public requiredAreaToHeatExchanger():number{
        // --- CONVERSÕES ---
        const energyConsumedInJoule = this.EnergyConsumedtoHeatMilk() * 1000;
        const durationInSeconds = this.duration * 3600;

        // --- VALORES INTERMEDIÁRIOS ---
        const potency = energyConsumedInJoule / durationInSeconds;

        // --- DEFINIDOS POR LÊLÊ ---
        const waterInTemp:number = 85;
        const waterOutTemp:number = 70;

        // --- FORMULAS  ---
        // 1º - Diferença de Temperatura Média Logarítmica (ΔTml​)
        const deltaT1 = waterInTemp - this.milkHeatingTemp;
        const deltaT2 = waterOutTemp - this.milkInputTemp;

        let logTempDiffMean:number;
        if(deltaT1 === deltaT2){
            logTempDiffMean = deltaT1;
        } else{
            logTempDiffMean = ((deltaT2)-(deltaT1)) / Math.log(deltaT2 / deltaT1);
        }

        if(logTempDiffMean === 0){
            return 0;
        }
        // 2º - Area necessária
        const result:number = potency / (Pasteurizer.globalHeatExchangeCoef * logTempDiffMean);

        return Pasteurizer.floatRound(result, 3);
    }

    // O: (kJ) Perdas térmicas
    public heatLoss():number{
        // --- CONVERSÕES ---
        // Eficiência em decimal (divisão por 100)
        const efficiencyInDecimal = this.efficiency / 100;

        // --- FORMULAS  ---
        const result:number = this.EnergyConsumedtoHeatMilk() * (1 - efficiencyInDecimal);
        return Pasteurizer.floatRound(result, 2);
    }
}