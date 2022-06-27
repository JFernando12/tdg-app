const { Router } = require("express");
const router = Router();
const controller = require("./index");
const response = require("../../../network/response");

router.get("/", async(req, res) => {
    try {
        const result = await controller.list(req.query);
        response.general(res, 200, result.count, result.next, result.previous, result.rows);
    } catch (error) {
        response.error(res, 400, "Algo salió mal");
    }
})

router.get("/:id", async(req, res) => {
    try {
        const result = await controller.getOne(req.params.id);
        response.getOne(res, 200, result)
    } catch (error) {
        response.error(res, 400, "Algo salió mal")
    }
})

router.post("/:order_id", async(req, res) => {
    try {
        await controller.add(req.params.order_id, req.body);
        response.success(res, 201, "Creado correctamente");
    } catch (error) {
        response.error(res, 400, "Algo salió mal")
    }
})

router.patch("/:id", async(req, res) => {
    try {
        await controller.update(req.params.id, req.body);
        response.success(res, 201, "Actualizado correctamente");
    } catch (error) {
        response.error(res, 400, "Algo salió mal");
    }
})

router.delete("/:id", async(req, res) => {
    try {
        await controller.remove(req.params.id);
        response.success(res, 200, "Eliminado correctamente");
    } catch (error) {
        response.error(res, 400, "Algo salió mal");
    }
})

module.exports = router;