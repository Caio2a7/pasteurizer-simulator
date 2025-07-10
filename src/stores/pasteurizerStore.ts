import { defineStore } from "pinia";

const PASTEURIZER_STORAGE_KEY = 'pasteurizador_de_lele';

interface ResultUnit<T> {
  result: T | null;
  measure: string;
}

interface PasteurizerSettings {
  milkInputTemp: number;
  milkHeatingTemp: number;
  milkVolume: number;
  milkFreezeTemp: number;
  duration: number;
  efficiency: number;
}
interface PasteurizerResults {
  energyConsumedToHeatMilk: ResultUnit<number>;
  milkFlowRate: ResultUnit<number>;
  steamInputFlowRate: ResultUnit<number>;
  freezingWaterInputFlowRate: ResultUnit<number>;
  requiredAreaToHeatExchanger: ResultUnit<number>;
  heatLoss: ResultUnit<number>;
}
interface PasteurizerState {
    settings: PasteurizerSettings;
    results: PasteurizerResults;
}

function getInitialState() : PasteurizerState{
    const savedData = localStorage.getItem(PASTEURIZER_STORAGE_KEY)

    if(savedData) {
        try{
            return JSON.parse(savedData) as PasteurizerState;
        } catch(err){
            console.error('Erro ao carregar storage do pasteurizador: ' + err);
        }
    }
    return {
        settings: {
            milkInputTemp: 7,
            milkHeatingTemp: 72,
            milkVolume: 500,
            milkFreezeTemp: 4.5,
            duration: 1,
            efficiency: 75
        },
        results: {
            energyConsumedToHeatMilk:       {result: null, measure: 'kJ'},
            heatLoss:                       {result: null, measure: 'kJ'},
            steamInputFlowRate:             {result: null, measure: 'kg/h'},
            freezingWaterInputFlowRate:     {result: null, measure: 'kg/h'},
            requiredAreaToHeatExchanger:    {result: null, measure: 'm²'},
            milkFlowRate:                   {result: null, measure: 'L/min'},
        }
    };
}

export const usePasteurizerStorage = defineStore('pasteurizer', {
    state: (): 
        PasteurizerState => getInitialState(),
    getters: {
        getSettings(state): PasteurizerSettings{
            return state.settings
        },
        getResults(state): PasteurizerResults{
            return state.results
        }

    },
    actions: {
        updateSettings(newSettings:Partial<PasteurizerSettings>){
            this.settings = {...this.settings, ...newSettings};
            this.saveState();
        },

        updateResults(newResults:PasteurizerResults){
            this.results = newResults;
            this.saveState();
        },

        resetStore(){
            localStorage.removeItem(PASTEURIZER_STORAGE_KEY);
            this.$reset;
        },

        saveState(){
            try{
                localStorage.setItem(PASTEURIZER_STORAGE_KEY, JSON.stringify(this.$state))
            } catch(err){
                console.error('Erro ao salvar o estado da aplicação na storage: ' + err)
            }
        }
    }
})