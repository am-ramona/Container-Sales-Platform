import rootReducer from "./index";
import axios from "axios";

jest.mock("axios", () => {
    return {
        get: jest.fn()
    }
});

describe("The rootReducer", () => {
    it("should return the initial state when no state is provided", () => {
        let action = {type: "ACTION"};
        expect(rootReducer(undefined, action)).toEqual({
                "domains": [],
                "loggedIn": false,
                "metrics": [],
                "selectedDomain": undefined,
                "selectedService": undefined,
            }
        );
    });

    it("should return the state by default", () => {
        let state = {};
        let action = {type: "UNKNOW_ACTION"};
        expect(rootReducer(state, action)).toEqual({});
    });
});
