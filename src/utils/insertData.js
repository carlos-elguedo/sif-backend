const {mongoose} = require('../database')

const Profession = require('../models/Profession')
const Category = require('../models/ProfessionGroup')

const group_categorias = [
    {
        'esp':'Artesanías',
        'eng':'Handicrafts',
        'cod':'ART'
    },
    {
        'esp':'Técnicos',
        'eng':'Technicians',
        'cod':'TEC'
    },
    {
        'esp':'Eventos sociales',
        'eng':'Social events',
        'cod':'SOC'
    },
    {
        'esp':'Transporte y Vehículos',
        'eng':'Transportation and Vehicles',
        'cod':'TAV'
    },
    {
        'esp':'Salud',
        'eng':'Health',
        'cod':'HEA'
    },
    {
        'esp':'Comercio de ropa',
        'eng':'Clothing trade',
        'cod':'CLO'
    },
    {
        'esp':'Comercio de alimentos',
        'eng':'Food trade',
        'cod':'FOO'
    },
    {
        'esp':'Construcción',
        'eng':'Building',
        'cod':'BUI'
    },
    {
        'esp':'Sistemas informáticos',
        'eng':'Information systems',
        'cod':'SIS'
    },
    {
        'esp':'Aseo y animales',
        'eng':'Toilet and animals',
        'cod':'AAP'
    },
    {
        'esp':'Musicales y artísticos',
        'eng':'Musical and artistic',
        'cod':'MUS'
    },
    {
        'esp':'Educativo',
        'eng':'Educational',
        'cod':'EDU'
    },
    {
        'esp':'Personales',
        'eng':'Personal',
        'cod':'PER'
    },
    {
        'esp':'Estética y cuidado personal',
        'eng':'Aesthetics and personal care',
        'cod':'EST'
    },
    {
        'esp':'Consultores, finanzas y jurídicos',
        'eng':'Consultants, finance and legal',
        'cod':'LEG'
    },
    {
        'esp':'Alquiler y ventas',
        'eng':'Rental and sales',
        'cod':'RAS'
    }
    // {
    //     'esp':'',
    //     'eng':''
    // },

];



const professions = [
    {
        'esp':'Pintor',
        'eng':'Painter',
        'grp':'ART',
        'cod':'PIN_A'
    },
    {
        'esp':'Zapatero',
        'eng':'Shoemaker',
        'grp':'ART',
        'cod':'ZAP'
    },
    {
        'esp':'Manualidades y accesorios',
        'eng':'Crafts and accessories',
        'grp':'ART',
        'cod':'MANAC'
    },
    //Tecnicos
    {
        'esp':'Carpintero',
        'eng':'Carpenter',
        'grp':'TEC',
        'cod':'CARP'
    },
    {
        'esp':'Plomero',
        'eng':'Plumber',
        'grp':'TEC',
        'cod':'PLOM'
    },
    {
        'esp':'Electricista',
        'eng':'Electrical technician',
        'grp':'TEC',
        'cod':'ELEC'
    },
    {
        'esp':'Herrero',
        'eng':'Blacksmith',
        'grp':'TEC',
        'cod':'HERR'
    },
    {
        'esp':'Doblador',
        'eng':'Bender',
        'grp':'TEC',
        'cod':'DOBL'
    },
    {
        'esp':'Instrumentos musicales',
        'eng':'Musical instruments',
        'grp':'TEC',
        'cod':'TMUS'
    },
    {
        'esp':'Relojeros',
        'eng':'Watchmakers',
        'grp':'TEC',
        'cod':'TREL'
    },
    {
        'esp':'Soldador',
        'eng':'Welder',
        'grp':'TEC',
        'cod':'SOLD'
    },
    {
        'esp':'Técnico de Computadores',
        'eng':'Computer Technician',
        'grp':'TEC',
        'cod':'TCOM'
    },
    {
        'esp':'Técnico de Electrodomésticos',
        'eng':'Appliance Technician',
        'grp':'TEC',
        'cod':'TELE'
    },
    {
        'esp':'Técnico de Smartphones',
        'eng':'Smartphones Technician',
        'grp':'TEC',
        'cod':'TSMA'
    },
    //Eventos sociales
    {
        'esp':'Animadores',
        'eng':'Animator',
        'grp':'SOC',
        'cod':'SE_AN'
    },
    {
        'esp':'Decorador',
        'eng':'Decorator',
        'grp':'SOC',
        'cod':'DECO'
    },
    {
        'esp':'Logística',
        'eng':'Logistics',
        'grp':'SOC',
        'cod':'SE_LO'
    },
    {
        'esp':'Piñatería y personalización',
        'eng':'Piñatería and customization',
        'grp':'SOC',
        'cod':'PIPE'
    },
    {
        'esp':'Cocineros',
        'eng':'Cook Chef',
        'grp':'SOC',
        'cod':'SE_CO'
    },
    {
        'esp':'Fotógrafo',
        'eng':'Photographer',
        'grp':'SOC',
        'cod':'FOTO'
    },
    {
        'esp':'Alquiler de elementos de recreación',
        'eng':'Rental of recreation elements',
        'grp':'SOC',
        'cod':'AREC'
    },
    //Transporte y Vehículos
    {
        'esp':'Transporte de niños',
        'eng':'Transportation of children',
        'grp':'TAV',
        'cod':'TRNI'
    },
    {
        'esp':'Transporte especial',
        'eng':'Special transport',
        'grp':'TAV',
        'cod':'TRES'
    },
    {
        'esp':'Mecánico',
        'eng':'Mechanic',
        'grp':'TAV',
        'cod':'MECA'
    },
    {
        'esp':'Mantenimiento de vehículos',
        'eng':'Vehicle maintenance',
        'grp':'TAV',
        'cod':'MANV'
    },
    {
        'esp':'Mudanzas',
        'eng':'Removals',
        'grp':'TAV',
        'cod':'MUDA'
    },
    {
        'esp':'Transporte de mercancía',
        'eng':'Trucking',
        'grp':'TAV',
        'cod':'TMER'
    },
    {
        'esp':'Electricista automotriz',
        'eng':'Automotive electrician',
        'grp':'TAV',
        'cod':'AELE'
    },
    {
        'esp':'Pintor automotriz',
        'eng':'Automotive painter',
        'grp':'TAV',
        'cod':'PINA'
    },
    {
        'esp':'Mecánico de bicicletas',
        'eng':'Bicycle mechanic',
        'grp':'TAV',
        'cod':'MEBI'
    },
    {
        'esp':'Instructor de conducción',
        'eng':'Driving instructor',
        'grp':'TAV',
        'cod':'INCO'
    },
    //Salud
    {
        'esp':'Enfermero',
        'eng':'Nurse',
        'grp':'HEA',
        'cod':'ENFE'
    },
    {
        'esp':'Médico general',
        'eng':'General doctor',
        'grp':'HEA',
        'cod':'MEDI'
    },
    {
        'esp':'Dentista',
        'eng':'Dentist',
        'grp':'HEA',
        'cod':'DENT'
    },
    {
        'esp':'Químico',
        'eng':'Surgeon',
        'grp':'HEA',
        'cod':'QUIM'
    },
    {
        'esp':'Bacteriólogo',
        'eng':'Bacteriologist',
        'grp':'HEA',
        'cod':'BACT'
    },
    {
        'esp':'Cirujano',
        'eng':'Surgeon',
        'grp':'HEA',
        'cod':'CIRJ'
    },
    {
        'esp':'Oftalmólogo',
        'eng':'Ophthalmologist',
        'grp':'HEA',
        'cod':'OFTA'
    },
    {
        'esp':'Ortopedista',
        'eng':'Orthopedist',
        'grp':'HEA',
        'cod':'ORTP'
    },
    {
        'esp':'Psicólogo',
        'eng':'Psychologist',
        'grp':'HEA',
        'cod':'PSIC'
    },
    {
        'esp':'Nutricionista',
        'eng':'Nutritionist',
        'grp':'HEA',
        'cod':'NUTR'
    },
    //CLOTHING
    {
        'esp':'Modista',
        'eng':'Clothes designer',
        'grp':'CLO',
        'cod':'MODI'
    },
    {
        'esp':'Diseñador',
        'eng':'Designer',
        'grp':'CLO',
        'cod':'DISE'
    },
    //COMIDA
    {
        'esp':'Comida rápida a domicilios',
        'eng':'Fast food to homes',
        'grp':'FOO',
        'cod':'RAPC'
    },
    {
        'esp':'Cocinero',
        'eng':'Chef',
        'grp':'FOO',
        'cod':'COCI'
    },
    {
        'esp':'Panadero',
        'eng':'Baker',
        'grp':'FOO',
        'cod':'PANA'
    },
    //CONSTRUCCION
    {
        'esp':'Albañil',
        'eng':'Builder',
        'grp':'BUI',
        'cod':'ALBA'
    },
    {
        'esp':'Maestro de obra',
        'eng':'Foreman',
        'grp':'BUI',
        'cod':'MAAL'
    },
    {
        'esp':'Diseñador y decorador de interiores',
        'eng':'Interior designer and decorator',
        'grp':'BUI',
        'cod':'DIIN'
    },
    {
        'esp':'Ingeniero civil',
        'eng':'Civil engineer',
        'grp':'BUI',
        'cod':'INCI'
    },
    {
        'esp':'Arquitecto',
        'eng':'Architect',
        'grp':'BUI',
        'cod':'ARCI'
    },
    {
        'esp':'Tapicero',
        'eng':'Painter',
        'grp':'BUI',
        'cod':'TAPI'
    },
    {
        'esp':'Pintor',
        'eng':'Upholsterer',
        'grp':'BUI',
        'cod':'PINT'
    },
    {
        'esp':'Enchapadores y colocadores de suelo',
        'eng':'Pallets and soil layers',
        'grp':'BUI',
        'cod':'ENCH'
    },
    // Sistemas informáticos
    {
        'esp':'Diseñador grafico',
        'eng':'Graphic designer',
        'grp':'SIS',
        'cod':'DIGR'
    },
    {
        'esp':'Programador',
        'eng':'Programmer',
        'grp':'SIS',
        'cod':'PROG'
    },
    {
        'esp':'Marketing digital',
        'eng':'Digital marketing',
        'grp':'SIS',
        'cod':'MADI'
    },
    // Aseo y animales
    {
        'esp':'Jardinero',
        'eng':'Gardener',
        'grp':'AAP',
        'cod':'JARD'
    },
    {
        'esp':'Empleado domestico',
        'eng':'Domestic employee',
        'grp':'AAP',
        'cod':'DOEM'
    },
    {
        'esp':'Cuidador de animales',
        'eng':'Animal caretaker',
        'grp':'AAP',
        'cod':'CUIA'
    },
    {
        'esp':'Veterinario',
        'eng':'Vet',
        'grp':'AAP',
        'cod':'VETE'
    },
    // Musicales y artísticos
    {
        'esp':'Bailarín',
        'eng':'Dancer',
        'grp':'MUS',
        'cod':'BAIL'
    },
    {
        'esp':'Cantante',
        'eng':'Singer',
        'grp':'MUS',
        'cod':'CANT'
    },
    {
        'esp':'DJ - operador de audio',
        'eng':'DJ - audio operator',
        'grp':'MUS',
        'cod':'DJ'
    },
    {
        'esp':'Especialista en Instrumento',
        'eng':'Instrument Specialist',
        'grp':'MUS',
        'cod':'INST'
    },
    {
        'esp':'Modelo',
        'eng':'Model',
        'grp':'MUS',
        'cod':'MODE'
    },
    {
        'esp':'Actor',
        'eng':'Actor',
        'grp':'MUS',
        'cod':'ACTO'
    },
    //Educativo
    {
        'esp':'Profesor de preescolar',
        'eng':'Preschool teacher',
        'grp':'EDU',
        'cod':'PRPR'
    },
    {
        'esp':'Profesor',
        'eng':'Professor',
        'grp':'EDU',
        'cod':'PROF'
    },
    {
        'esp':'Tutor',
        'eng':'Tutor',
        'grp':'EDU',
        'cod':'TUTO'
    },
    {
        'esp':'Entrenador deportivo',
        'eng':'Sports coach',
        'grp':'EDU',
        'cod':'ENDE'
    },
    //Personal
    {
        'esp':'Niñero',
        'eng':'Baby-sitter',
        'grp':'PER',
        'cod':'NINE'
    },
    {
        'esp':'Traductor',
        'eng':'Translator',
        'grp':'PER',
        'cod':'TRAD'
    },
    {
        'esp':'Detective',
        'eng':'Detective',
        'grp':'PER',
        'cod':'DETE'
    },
    {
        'esp':'Escolta',
        'eng':'Shooting guard',
        'grp':'PER',
        'cod':'ESCO'
    },
    {
        'esp':'Cuidador de enfermos',
        'eng':'Sick caregiver',
        'grp':'PER',
        'cod':'CUEN'
    },
    {
        'esp':'Vigilante',
        'eng':'Vigilant',
        'grp':'PER',
        'cod':'VIGL'
    },
    // Estética y cuidado personal
    {
        'esp':'Peluquero',
        'eng':'Hairdresser',
        'grp':'EST',
        'cod':'PELU'
    },
    {
        'esp':'Barbero',
        'eng':'Barber',
        'grp':'EST',
        'cod':'BARB'
    },
    {
        'esp':'Manicurista',
        'eng':'Manicurist',
        'grp':'EST',
        'cod':'MANI'
    },
    {
        'esp':'Masajista',
        'eng':'Massage therapist',
        'grp':'EST',
        'cod':'MASA'
    },
    {
        'esp':'Entrenador - Gimnasio',
        'eng':'Coach - Gym',
        'grp':'EST',
        'cod':'ENGM'
    },
    {
        'esp':'Maquillador',
        'eng':'Makeup artist',
        'grp':'EST',
        'cod':'MAQU'
    },
    // Consultores, finanzas y jurídicos
    {
        'esp':'Abogado',
        'eng':'lawyer',
        'grp':'LEG',
        'cod':'ABOG'
    },
    {
        'esp':'Consultor',
        'eng':'Consultant',
        'grp':'LEG',
        'cod':'CONS'
    },
    {
        'esp':'Economista',
        'eng':'Economist',
        'grp':'LEG',
        'cod':'ECON'
    },
    {
        'esp':'Contador publico',
        'eng':'Certified Public Accountant',
        'grp':'LEG',
        'cod':'COPU'
    },
    {
        'esp':'Secretario',
        'eng':'Secretary',
        'grp':'LEG',
        'cod':'SECR'
    },
    {
        'esp':'Revisor fiscal',
        'eng':'Fiscal Auditor',
        'grp':'LEG',
        'cod':'REFI'
    },
    {
        'esp':'Analista financiero',
        'eng':'Financial analyst',
        'grp':'LEG',
        'cod':'ANFI'
    },
    // Alquiler y ventas
    {
        'esp':'Apartamentos',
        'eng':'Apartments',
        'grp':'RAS',
        'cod':'APAR'
    },
    {
        'esp':'Terrenos',
        'eng':'Land',
        'grp':'RAS',
        'cod':'TERR'
    },
    {
        'esp':'Casas',
        'eng':'Houses',
        'grp':'RAS',
        'cod':'CASA'
    },
    {
        'esp':'Vehículos',
        'eng':'Vehicles',
        'grp':'RAS',
        'cod':'VEHI'
    }
    // {
    //     'esp':'',
    //     'eng':'',
    //     'grp':'',
    //     'cod':''
    // }

];



insertCategorias = async() =>{
    for(cat of group_categorias){

        //Print message
        console.log(`Insertando: ${cat.esp}`)

        try{
            //New Category to add
            // console.log(`${cat.esp} ${cat.eng} ${cat.cod}`)
            let category = new Category({
                cod:cat.cod,
                name_es:cat.esp,
                name_en:cat.eng,
                description: '',
                city:[1],
                status: true
            })
            //Saved the record
            await category.save()
        }catch(error){
            console.log('Error: ' + error)
        }
        
    }//End for

}

insertProfessiones = async() =>{
    for(pro of professions){

        //Print message
        console.log(`Insertando: ${pro.esp}`)

        try{
            //New Category to add
            // console.log(`${cat.esp} ${cat.eng} ${cat.cod}`)
            let profession = new Profession({
                cod:pro.cod,
                name_es:pro.esp,
                name_en:pro.eng,
                description: '',
                city:[1],
                status: true,
                group: [pro.grp]
            })
            //Saved the record
            await profession.save()
        }catch(error){
            console.log('Error: ' + error)
        }
        
    }//End for

}

// insertCategorias()
insertProfessiones()