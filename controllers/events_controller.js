// DEPENDENCIES
const events = require("express").Router();
const db = require("../models");
const { Band, Event, Stage, StageEvent, MeetGreet, SetTime } = db;
const { Op } = require("sequelize");

// INDEX ROUTE - FIND ALL EVENTS
events.get("/", async (req, res) => {
  try {
    const foundEvents = await Event.findAll({
      // BONUS - LIMIT AND PAGINATION QUERY
      //   limit: 10,
      //   offset: 10,
      order: [["date", "ASC"]],
      // BONUS - FILTER BY NAME WITH A QUERY STRING
      where: {
        name: { [Op.like]: `%${req.query.name ? req.query.name : ""}%` },
      },
    });
    res.status(200).json(foundEvents);
  } catch (error) {
    res.status(500).json(error);
  }
});

// CREATE A Event Route
events.post("/", async (req, res) => {
  try {
    const newEvent = await Event.create(req.body);
    res.status(200).json({
      message: "Successfully inserted a new event",
      data: newEvent,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// SHOW ROUTE - FIND A SPECIFIC BAND
events.get("/:name", async (req, res) => {
  try {
    const foundEvent = await Event.findOne({
      where: { name: req.params.name },
      include: [
        {
          model: MeetGreet,
          as: "meet_greets",
          include: {
            model: Band,
            as: "band",
            where: {
              name: { [Op.like]: `%${req.query.band ? req.query.band : ""}%` },
            },
          },
        },
        {
          model: SetTime,
          as: "set_times",
          include: [
            {
              model: Band,
              as: "band",
              where: {
                name: {
                  [Op.like]: `%${req.query.band ? req.query.band : ""}%`,
                },
              },
            },
            {
              model: Stage,
              as: "stage",
              where: {
                name: {
                  [Op.like]: `%${req.query.stage ? req.query.stage : ""}%`,
                },
              },
            },
          ],
        },
        {
          model: Stage,
          as: "stages",
        },
      ],
    });
    res.status(200).json(foundEvent);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// UPDATE AN EVENT
events.put("/:id", async (req, res) => {
  try {
    const updatedEvents = await Event.update(req.body, {
      where: {
        event_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedEvents} event(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE AN EVENT
events.delete("/:id", async (req, res) => {
  try {
    const deletedEvents = await Event.destroy({
      where: {
        event_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedEvents} event(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT
module.exports = events;