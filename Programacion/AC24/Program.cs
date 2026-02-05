using System;

namespace FabricaRobots {

    // LAS CLASES (Los planos de nuestros robots)

    class Robot {
        // Estas son las propiedades comunes a todos
        public string Nombre { get; set; }
        public string Modelo { get; set; }

        public Robot(string modelo, string nombre) {
            this.Modelo = modelo;
            this.Nombre = nombre;
        }

        // Métodos que todos los robots pueden usar
        public string ObtenerNombre() => Nombre;
        public string ObtenerModelo() => Modelo;
    }

    // El ":" significa que R2D2 HEREDA de Robot (copia sus cosas)
    class R2D2 : Robot {
        public int Energia { get; set; }
        // El "base" pasa el modelo y nombre a la clase padre
        public R2D2(string nombre, int energia) : base("R2D2", nombre) {
            this.Energia = energia;
        }
        public void ActivarRadar() => Console.WriteLine("R2D2: Radar activado [---o---]");
        public void Rodar() => Console.WriteLine("R2D2: Rodando sobre sus orugas...");
    }

    class C3PO : Robot {
        public int Idiomas { get; set; }
        public C3PO(string nombre, int idiomas) : base("C3PO", nombre) {
            this.Idiomas = idiomas;
        }
        public void AñadirIdioma() { Idiomas++; Console.WriteLine("C3PO: Nuevo idioma aprendido."); }
        public void Saludar() => Console.WriteLine("C3PO: ¡Saludos! Soy C3PO y domino " + Idiomas + " formas de comunicación.");
    }

    class BB8 : Robot {
        public int Blindaje { get; set; }
        public BB8(string nombre, int blindaje) : base("BB8", nombre) {
            this.Blindaje = blindaje;
        }
        public void ActivarArmas() => Console.WriteLine("BB8: Armas desplegadas.");
        public void Disparar() => Console.WriteLine("BB8: ¡Piu piu! Disparando láser.");
    }

    // PROGRAMA PRINCIPAL

    class Program {
        // Necesitamos el Random fuera para que no se reinicie cada vez
        static Random rnd = new Random();

        static void Main(string[] args) {
            // El inventario: un array de 10 huecos para objetos tipo Robot
            Robot[] fabrica = new Robot[10]; 
            bool salir = false;

            while (!salir) {
                Console.WriteLine("\n===== FÁBRICA DE ROBOTS =====");
                Console.WriteLine("1. Generar Robot\n2. Restablecer Robot\n3. Ver Posición\n4. Eliminar\n5. Listar\n6. Salir");
                Console.Write("Selecciona: ");

                string opcion = Console.ReadLine()!;

                // Controlamos qué función llamar según lo que escriba el usuario
                switch (opcion) {
                    case "1": CrearRobot(fabrica); break;
                    case "2": RestablecerRobot(fabrica); break;
                    case "3": VerRobot(fabrica); break;
                    case "4": EliminarRobot(fabrica); break;
                    case "5": ListarRobots(fabrica); break;
                    case "6": salir = true; break;
                    default: Console.WriteLine("Error: Opción no válida."); break;
                }
            }
        }

        // FUNCIONES

        static void CrearRobot(Robot[] fabrica) {
            // Buscamos un hueco que valga null (vacío)
            int pos = BuscarHuecoLibre(fabrica);
            if (pos == -1) {
                Console.WriteLine("Sin espacio en la fábrica.");
                return;
            }

            Console.WriteLine("Tipo: 1.R2D2 | 2.C3PO | 3.BB8");
            string tipo = Console.ReadLine()!;
            string nombre = GenerarNombreUnico(fabrica);

            // Dependiendo del tipo, creamos un objeto u otro en el array
            if (tipo == "1") fabrica[pos] = new R2D2(nombre, 100);
            else if (tipo == "2") fabrica[pos] = new C3PO(nombre, 6000000);
            else if (tipo == "3") fabrica[pos] = new BB8(nombre, 50);
            else Console.WriteLine("Tipo incorrecto.");

            if (fabrica[pos] != null) Console.WriteLine("Creado: " + nombre);
        }

        static void RestablecerRobot(Robot[] fabrica) {
            Console.Write("Posición a resetear: ");
            // TryParse sirve para que si el usuario escribe una letra, el programa no pete
            if (int.TryParse(Console.ReadLine(), out int pos) && pos >= 0 && pos < fabrica.Length) {
                if (fabrica[pos] != null) {
                    // Borramos nombre viejo y ponemos uno nuevo
                    string nuevoNombre = GenerarNombreUnico(fabrica);
                    fabrica[pos].Nombre = nuevoNombre;
                    Console.WriteLine("Reset completado. Nuevo nombre: " + nuevoNombre);
                }
            }
        }

        static void VerRobot(Robot[] fabrica) {
            Console.Write("Posición: ");
            if (int.TryParse(Console.ReadLine(), out int pos) && pos >= 0 && pos < fabrica.Length) {
                Robot r = fabrica[pos];
                if (r != null) {
                    Console.WriteLine("\nNombre: " + r.ObtenerNombre() + " | Modelo: " + r.ObtenerModelo());
                    
                    // El "is" sirve para saber de qué clase hija es el robot
                    // y así poder usar sus métodos especiales
                    if (r is R2D2 r2) {
                        r2.ActivarRadar();
                    } else if (r is C3PO c3) {
                        c3.Saludar();
                    } else if (r is BB8 b8) {
                        b8.Disparar();
                    }
                }
            }
        }

        static void EliminarRobot(Robot[] fabrica) {
            Console.Write("Posición a borrar: ");
            if (int.TryParse(Console.ReadLine(), out int pos) && pos >= 0 && pos < fabrica.Length) {
                // Para eliminarlo, simplemente decimos que ese hueco vuelve a ser null
                fabrica[pos] = null;
                Console.WriteLine("Robot eliminado.");
            }
        }

        static void ListarRobots(Robot[] fabrica) {
            for (int i = 0; i < fabrica.Length; i++) {
                // Si la posición no es null, imprimimos los datos del robot
                if (fabrica[i] != null) 
                    Console.WriteLine($"[{i}] {fabrica[i].Nombre} ({fabrica[i].Modelo})");
                else 
                    Console.WriteLine($"[{i}] --- VACÍO ---");
            }
        }

        // (Utilidades)

        // Recorre el array y devuelve el primer índice que esté a null
        static int BuscarHuecoLibre(Robot[] fabrica) {
            for (int i = 0; i < fabrica.Length; i++) {
                if (fabrica[i] == null) return i;
            }
            return -1; // Si no hay huecos, devuelve -1
        }

        static string GenerarNombreUnico(Robot[] fabrica) {
            string nombre;
            bool repetido;
            do {
                repetido = false;
                // Generamos 2 letras (ASCII 65-90 es A-Z)
                char l1 = (char)rnd.Next(65, 91);
                char l2 = (char)rnd.Next(65, 91);
                // Generamos número de 3 cifras
                int num = rnd.Next(100, 1000);
                nombre = "" + l1 + l2 + num;

                // Comprobamos si algún robot ya tiene este nombre
                for (int i = 0; i < fabrica.Length; i++) {
                    if (fabrica[i] != null && fabrica[i].Nombre == nombre) {
                        repetido = true; // Si lo encontramos, el bucle do-while se repite
                    }
                }
            } while (repetido);
            return nombre;
        }
    }
}