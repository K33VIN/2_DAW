using Xunit;

namespace PROYECTO 
{
    public class UnitTest1 
    {
        // Instanciamos la clase Metodos que has creado
        private readonly Metodos _metodos = new Metodos();

        [Fact]
        public void Test_Tareas_Desarrollo() 
        {
            // Prueba 1: Requisitos (Funcional vs No Funcional)
            var tipoReq = _metodos.ClasificarRequisito("RF_Login");
            Assert.Equal("Funcional", tipoReq);
            Assert.Contains("Func", tipoReq);
            Assert.NotNull(tipoReq);

            // Prueba 2: Agile (Horas de trabajo)
            var horas = _metodos.CalcularCargaSprint(10, 2);
            Assert.Equal(20, horas);
            Assert.True(horas > 0);
            Assert.InRange(horas, 1, 100);

            // Prueba 3: Kanban (Estados)
            var resultadoKanban = _metodos.EstaFinalizada("DONE");
            Assert.True(resultadoKanban);
            Assert.False(_metodos.EstaFinalizada("TODO"));
            Assert.IsType<bool>(resultadoKanban);

            // Prueba 4: Consola de Windows (Limpieza de comandos)
            var comandoLimpio = _metodos.PrepararComando("  DIR /W  ");
            Assert.Equal("dir /w", comandoLimpio);
            Assert.DoesNotContain("  ", comandoLimpio);
            Assert.StartsWith("d", comandoLimpio);

            // Prueba 5: Control de versiones Git
            var gitStatus = _metodos.SimularGitAdd("style.scss");
            Assert.Contains("staging", gitStatus);
            Assert.EndsWith("area", gitStatus);
            Assert.NotEmpty(gitStatus);
        }
    }
}