import { z } from 'zod';

export const pasteurizerSettingsSchema = z.object({
    milkInputTemp: z.number({ message: "Temperatura deve ser um número."}).positive("Temperatura deve ser positiva."),
    milkHeatingTemp: z.number().positive("Temperatura deve ser positiva."),
    milkVolume: z.number().positive("Volume deve ser positivo."),
    milkFreezeTemp: z.number(),
    duration: z.number().positive("Duração deve ser positiva."),
    efficiency: z.number().min(1, "Eficiência deve ser no mínimo 1%.").max(100, "Eficiência não pode passar de 100%."),
    
    coolingWaterInTemp: z.number(),
    coolingWaterOutTemp: z.number(),
    heatingWaterInTemp: z.number(),
    heatingWaterOutTemp: z.number()
}).refine(data => data.milkHeatingTemp > data.milkInputTemp, {
    message: "A temperatura de pasteurização deve ser maior que a de entrada.",
    path: ["milkHeatingTemp"],
});

export type PasteurizerSettingsZod = z.infer<typeof pasteurizerSettingsSchema>;