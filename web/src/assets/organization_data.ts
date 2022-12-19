import i18n from "@/i18n";
export default function () {
    return [
        {
            title: i18n.t("about.team.board.title").toString(),
            about: i18n.t("about.team.board.description").toString(),
            href: "board",
            group_photo: "/images/profile_pictures/board/board.png",
            members: [
                {
                    name: "Jacob Höglund",
                    title: i18n.t("about.team.titles.project-leader").toString(),
                    avatar: "/images/profile_pictures/board/project_leader.png",
                    texts: [
                        "Hello, my name is Jacob Höglund. I come from Stockholm and I am studying my fifth(+/-3years) year in industrial design specialized in production design. I enjoy games in all forms, both sports and video games as well as some board games and have a huge passion for music. ",
                        "As project leader my goal is to drive the organization forward and take it to new heights. My responsibilities involve both technical and administrative work but I am leaning more into the administrative side of the project. ",
                        "I see this project as a great opportunity and challenge to restart the formula student team that once existed at LTU, and operate it with new potential.My hopes are to gain experience within working in a larger scale project as well as overall create memories and have a good time!"
                    ],
                    email: "jacob.hoglund@luleafs.se",
                },
                {
                    name: "Samuel Höglund",
                    title: i18n.t("about.team.titles.technical-leader").toString(),
                    avatar: "/images/profile_pictures/board/technical_leader_1.jpg",
                    texts: [
                        "Hello, my name is Samuel Höglund and I am from Borlänge. I study my fourth year as a mechanical engineering student. Through Formula Student, I want to realize my childhood dream of building a really fast racing car.",
                        "For me, Formula Student is a unique opportunity to collaborate with students from other academic fields and learn from others in order to develop. Which is why I brought Formula Student to life at LTU and hope to establish a solid foundation for future students involved in the project.",
                        "As Chief Technical Officer my responsibilities lie to extract as much potential from the car as possible making sure every component delivers as expected."
                    ]
                },
                {
                    name: "Erik Landmark",
                    title: i18n.t("about.team.titles.technical-leader").toString(),
                    avatar: "/images/profile_pictures/board/technical_leader_2.png",
                    linkedin: "https://www.linkedin.com/in/erik-landmark-193067128/",
                    texts: [
                        "Hi, my name is Erik Landmark. I come from Gothenburg and I am a fourth year student studying mechanical engineering. I find it very interesting with product development and the process of manufacturing an item from thought to design. \n",
                        "I decided to participate in the start-up of the formula student team for the reason being that there are too few student organizations dedicated to product development at LTU. I want to change that!",
                        "As leader of the mechanical systems my responsibilities lie to extract as much potential from the car as possible making sure every component delivers as expected.",
                        "I look forward to gain experience of project management and evolve my skills in working in a larger group. Other than that I look forward to construct a roadworthy formula student car and go racing!"
                    ],
                    email: "erik.landmark@luleafs.se"
                },
                {
                    name: "Sannah Engelin",
                    title: `${i18n.t("about.team.titles.hr-manager").toString()}`,
                    avatar: "/images/profile_pictures/board/hr_manager.png",
                    texts: [
                        "Hi, my name is Sannah Engelin, I come from Gothenburg and study my third year as a psychology candidate. I love skiing on my freetime and enjoy painting/sketching.",
                        "As HR my role entails to arrange the recruitment of new team members as well as to ensure that every team maintains at a motivational level to deliver a top tier performance.",
                        "I´m participating in formula student because it is a great opportunity for me to apply my theoretical knowledge in real-life situations. I hope to learn from the experience"
                    ],
                    email: "sannah.engelin@luleafs.se",
                },
                {
                    name: "Max Wiberg",
                    team: "administration",
                    title: `${i18n.tc("about.team.titles.team-leader", 1).toString()} - ${i18n.t("about.team.administration.title").toString()}`,
                    avatar: "/images/profile_pictures/board/teamleader_admin.png",
                    texts: [
                        "Hello, my name is Max Wiberg. I come from Stockholm and study my third year as a student of architectural engineering. I found it very tempting to join the formula student team because of my interest in F1. I see it as a great opportunity for me to get an insight of how a team works and hopefully learn something from it.",
                        "I look forward to create a team that is competent to perform against all the other competing universities around the world.",
                        "As administration leader my role entails to operate formula student behind the scenes, making sure that every team has what they need to complete their work."
                    ],
                    email: "max.wiberg@luleafs.se",
                },
                {
                    name: "Fabian Dalenius",
                    team: "aerodynamics",
                    title: `${i18n.tc("about.team.titles.team-leader", 1).toString()} - ${i18n.t("about.team.aerodynamics.title").toString()}`,
                    avatar: "/images/profile_pictures/board/teamleader_aerodynamics.png",
                    texts: [
                        "Hi, my name is Fabian Dalenius and I study my first year of the master of science program in engineering physics. Let me tell you a little about my roll in this project. I, together with my team, investigate how to optimize the airflow around the vehicle. This applies both for low speeds and in high speeds.",
                        "I look forward to gain knowledge of this project and hopefully make use of it in the future. I as well see this as a great opportunity for me to connect and create contact with many companies."
                    ]
                },
                {
                    name: "Louise Lööf",
                    team: "chassis",
                    title: `${i18n.tc("about.team.titles.team-leader", 1).toString()} - ${i18n.t("about.team.chassis.title").toString()}`,
                    avatar: "/images/profile_pictures/board/teamleader_chassis.png",
                    texts: [
                        "Hello everyone! My name is Louise Lööf and I come from Uppsala. I am studying my second year here at LTU as a student of automotive engineering.",
                        "With having a great interest in motorsports combined with my studies, a project like this was obvious to participate in. I have a strong feeling that this project will contribute with useful knowledge that I will benefit from in the future.",
                        "My responsibilities as leader of the chassis team is to create a sustainable chassis for the vehicle that is suitable and adapted after what the other teams have developed. I as well supervise over the drivers safety in the car."
                    ]
                },
                {
                    name: "David Englund",
                    team: "power-train",
                    title: `${i18n.tc("about.team.titles.team-leader", 1).toString()} - ${i18n.t("about.team.power-train.title").toString()}`,
                    avatar: "/images/profile_pictures/board/teamleader_powertrain.png",
                    texts: [
                        "Hello, my name is David Englund. I come from Göteborg and study my third year as a mechanical engineering student. Being interested in motors I find it natural to take the position as leader of powertrain. Besides motors, on my freetime I like sailing, exercising and skiing.",
                        "I look forward to widen my knowledge of how components within the car industry work and to improve my leadership skills. I also hope to create a better understanding of the type of job I would like to have in the future.",
                        "Together with my team our responsibilities lie to provide a sustainable source of power that is reliable for the vehicle."
                    ]
                },
                {
                    name: "Alec Berkien",
                    team: "vehicle-dynamics",
                    title: `${i18n.tc("about.team.titles.team-leader", 1).toString()} - ${i18n.t("about.team.vehicle-dynamics.title").toString()}`,
                    avatar: "/images/profile_pictures/board/teamleader_vehicle_dynamics.png",
                    texts: [
                        "Hi, my name is Alec Berkien, I come from Malmö and study my fourth year as a mechanical engineering student. During my freetime I engage myself in RC cars/planes and play basketball.",
                        "I find dynamics as a very interesting subject which is why I applied for the role as Vehicle dynamic leader. My responsibilities regard the dynamical components of the car including suspension, steering, brakes and pedals",
                        "With LTU previously participating in formula student I thought it was sad that they laid off, which is why I engaged in the start-up of this project. I look forward to start developing the car and hope to establish a solid foundation of formula student here at LTU. "
                    ]
                },
                {
                    name: "Thomas Tillgren",
                    team: "low-voltage",
                    title: `${i18n.tc("about.team.titles.team-leader", 1).toString()} - ${i18n.t("about.team.low-voltage.title").toString()}`,
                    avatar: "/images/profile_pictures/board/teamleader_low_voltage.png",
                    texts: [
                        "Hello my name is Thomas Tillgren. This is my second year at LTU studying my engineering degree of material science. My interests lie in electronics and 3D printing which I think would help me with a strong advantage in this project.",
                        "I liked the idea of participating in a larger project and to put my knowledge to the test, which is why I joined formula student. I also look forward to establishing a new foundation for Formula Student at LTU.",
                        "As team leader of the low voltage system my task involves to develop a safety system for the vehicle. The work involves diagnosing problems and creating solutions that are safe to operate with."
                    ]
                },
            ]
        },
        {
            title: i18n.t("about.team.administration.title").toString(),
            about: i18n.t("about.team.administration.description").toString(),
            href: "administration",
            group_photo: "",
            members: [
                {
                    name: "Emilia Forsström",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Fabian Schön",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Idris Wongkum",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                }
            ]
        },
        {
            title: i18n.t("about.team.aerodynamics.title").toString(),
            about: i18n.t("about.team.aerodynamics.description").toString(),
            href: "aerodynamics",
            group_photo: "",
            members: [
                {
                    name: "Douglas Briggert",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Emma Söderberg",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Elias Saief Ennasser",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Arvid Roos",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                }
            ]
        },
        {
            title: i18n.t("about.team.chassis.title").toString(),
            about: i18n.t("about.team.chassis.description").toString(),
            href: "chassis",
            group_photo: "",
            members: [
                {
                    name: "Albin Lundvall",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Ahmad Mufleh",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Simon Resborn",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Joakim Johanson",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Jacob Gyllenberg",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                }
            ]
        },
        {
            title: i18n.t("about.team.low-voltage.title").toString(),
            about: i18n.t("about.team.low-voltage.description").toString(),
            href: "low-voltage",
            group_photo: "",
            members: [
                {
                    name: "Fredrik Höglund",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Carl Witt",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Wiktoria Grzelak",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                }
            ]
        },
        {
            title: i18n.t("about.team.power-train.title").toString(),
            about: i18n.t("about.team.power-train.description").toString(),
            href: "power-train",
            group_photo: "",
            members: [
                {
                    name: "Daniel Baniadam",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Anton Erensjö",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Anders Nilsson",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
                {
                    name: "Alexander Gimbergsson ",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                },
            ]
        },
        {
            title: i18n.t("about.team.vehicle-dynamics.title").toString(),
            about: i18n.t("about.team.vehicle-dynamics.description").toString(),
            href: "vehicle-dynamics",
            group_photo: "",
            members: [
                {
                    name: "Rasmus Malmqvist",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                }, {
                    name: "Arvid Lundholm",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                }, {
                    name: "Hamed Noori",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                }, {
                    name: "Pontus Gustafsson",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                }, {
                    name: "Ludvig Hansson",
                    title: i18n.t("about.team.titles.team-member").toString(),
                    avatar: "none"
                }
            ]
        }
    ];
}