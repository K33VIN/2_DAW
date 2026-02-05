using System;
using System.Collections.Generic;
using System.Linq;

namespace PROYECTO 
{
    public class Metodos 
    {
        // 1. Clasifica requisitos según si definen "qué" o "cómo"
        public string ClasificarRequisito(string id) => id.StartsWith("RF") ? "Funcional" : "No Funcional";

        // 2. Calcula las horas totales de un Sprint en metodología Agile
        public int CalcularCargaSprint(int tareas, int horasPorTarea) => tareas * horasPorTarea;

        // 3. Valida si una tarea ha llegado a la columna final del Kanban
        public bool EstaFinalizada(string estado) => estado.ToUpper() == "DONE";

        // 4. Limpia los comandos de espacios para que funcionen en la consola
        public string PrepararComando(string cmd) => cmd.Trim().ToLower();

        // 5. Simula el paso de archivos al área de preparación de Git (Staging)
        public string SimularGitAdd(string archivo) => $"File {archivo} moved to staging area";
    }
}