module.exports = [
"[project]/src/app/actions/deleteAppointment.js [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4042dc4dc958ad273c645aca145216059e3efa597e":"deleteAppointment"},"",""] */ __turbopack_context__.s([
    "deleteAppointment",
    ()=>deleteAppointment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiCall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/apiCall.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function deleteAppointment(formData) {
    try {
        const id = formData.get("id");
        // console.log('id from delete:',id)
        const token = formData.get("token");
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$apiCall$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["api"].delete(`/doctor/appointment`, {
            params: {
                id
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        // Refresh page data
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/admin/appointment", "page");
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message || "Failed to delete appointment"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    deleteAppointment
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAppointment, "4042dc4dc958ad273c645aca145216059e3efa597e", null);
}),
"[project]/.next-internal/server/app/(root)/admin/appointment/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/deleteAppointment.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$deleteAppointment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/deleteAppointment.js [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/(root)/admin/appointment/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/deleteAppointment.js [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "4042dc4dc958ad273c645aca145216059e3efa597e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$deleteAppointment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteAppointment"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$root$292f$admin$2f$appointment$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$deleteAppointment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(root)/admin/appointment/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/deleteAppointment.js [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$deleteAppointment$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/deleteAppointment.js [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=_abc6199f._.js.map