Para la pagina de proyecto, quiero que se presenten los diferentes proyectos con esta animación:

/* From Uiverse.io by kamehame-ha */ 

.cards {

  display: flex;

  flex-direction: column;

  gap: 15px;

}

.cards .red {

  background-color: #f43f5e;

}

.cards .blue {

  background-color: #3b82f6;

}

.cards .green {

  background-color: #22c55e;

}

.cards .card {

  display: flex;

  align-items: center;

  justify-content: center;

  flex-direction: column;

  text-align: center;

  height: 100px;

  width: 250px;

  border-radius: 10px;

  color: white;

  cursor: pointer;

  transition: 400ms;

}

.cards .card p.tip {

  font-size: 1em;

  font-weight: 700;

}

.cards .card p.second-text {

  font-size: .7em;

}

.cards .card:hover {

  transform: scale(1.1, 1.1);

}

.cards:hover > .card:not(:hover) {

  filter: blur(10px);

  transform: scale(0.9, 0.9);

}

Cuando pase el cursor por encima se difumine el fondo menos el proyecto por el que se pasa.

El fondo de proyectos y sobre mi ha de ser el mismo (silk) y has de arreglarlo porque no se ve bien. 

El ratón vuelve a dejarlo normal, y en la pagina de inicio, quiero que el nombre (Miquel valencia arbona) tenga este estilo:

Y que las cajas de Sobre mi, proyecto y contacto sean iguales, mismas medidas. Porque ahora la de contacto es más pequeña. 

https://lovable.dev/projects/81698840-dfac-4258-8b88-182e44e3dc6f?magic_link=mc_7d85a8da-8a8e-4f20-99c8-5e7eb1565ce1
