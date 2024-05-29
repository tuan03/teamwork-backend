require("dotenv").config();
const { DataTypes } = require("sequelize");
const sequelize = require("./utils/db");


const Project = sequelize.define(
  "Project",
  {
    idPPP: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },},
  {
    timestamps: false,
    tableName: "projects",
  }
);

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Pid: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: "tasks",
    timestamps: false,
  }
);

Task.belongsTo(Project, { foreignKey: "Pid" });
Project.hasMany(Task, { foreignKey: "Pid" });


sequelize
  .sync({ force: true })
  .then(() => {
    async function tuan() {
      
      await Project.create({name:"Project 1"})
      await Project.create({name:"Project 2"})
      // Project.create({name:"Project 2"})
      await Task.create({Pid:1})
      await Task.create({Pid:1})
      await Task.create({Pid:1})
      let projects = await Project.findAll({
        include: Task,
      });
      projects = projects.map(project => {
        return {
          id: project.dataValues.idPPP,
          name: project.dataValues.name,
          tasks: project.Tasks.map(task => {
            return {
              id: task.id, // or whatever your task id attribute is
              // other task attributes here
            };
          })
        };
      });
      console.log(projects)
      return 0;
    }
    tuan();
  })
  .catch((error) => {
    console.error("Unable to create tables, shutting down...", error);
  });

sequelize
  .authenticate()
  .then(() => {
    
  })
  .catch((err) => console.error("Unable to connect to the database", err));
