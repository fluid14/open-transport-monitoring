import React from 'react';
import GridListTemplate from "../templates/GridListTemplate";
import VehicleCard from "../components/molecules/VehicleCard";
import {Consumer} from "../context/GridViewType";
import VehicleName from "../components/atoms/VehicleName";



const VehicleView = () => (
    <>
       <VehicleName model="F-Max" mark="Ford"/>
        <Consumer>
            {gridView => (
                <GridListTemplate viewStyle={gridView.type}>
                    <>
                        <VehicleCard
                            to="/vehicle/123"
                            cardStyle={gridView.type}
                            brand="Ford"
                            model="F-Max"
                            registration="Pz12345"
                            status
                        />
                        <VehicleCard
                            to="/vehicle/123"
                            cardStyle={gridView.type}
                            brand="Ford"
                            model="F-Max"
                            registration="Pz12345"
                        />
                        <VehicleCard
                            to="/vehicle/123"
                            cardStyle={gridView.type}
                            brand="Ford"
                            model="F-Max"
                            registration="Pz12345"
                        />
                        <VehicleCard
                            to="/vehicle/123"
                            cardStyle={gridView.type}
                            brand="Ford"
                            model="F-Max"
                            registration="Pz12345"
                            status
                        />
                        <VehicleCard
                            to="/vehicle/123"
                            cardStyle={gridView.type}
                            brand="Ford"
                            model="F-Max"
                            registration="Pz12345"
                        />
                        <VehicleCard
                            to="/vehicle/123"
                            cardStyle={gridView.type}
                            brand="Ford"
                            model="F-Max"
                            registration="Pz12345"
                        />
                        <VehicleCard
                            to="/vehicle/123"
                            cardStyle={gridView.type}
                            brand="Ford"
                            model="F-Max"
                            registration="Pz12345"
                            status
                        />
                        <VehicleCard
                            to="/vehicle/123"
                            cardStyle={gridView.type}
                            brand="Ford"
                            model="F-Max"
                            registration="Pz12345"
                            status
                        />
                        <VehicleCard
                            to="/vehicle/123"
                            cardStyle={gridView.type}
                            brand="Ford"
                            model="F-Max"
                            registration="Pz12345"
                            status
                        />
                        <VehicleCard
                            to="/vehicle/123"
                            cardStyle={gridView.type}
                            brand="Ford"
                            model="F-Max"
                            registration="Pz12345"
                        />
                    </>
                </GridListTemplate>
            )}</Consumer>
    </>
);

export default VehicleView;
