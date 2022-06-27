CREATE TABLE clients (
    client_id varchar(50) primary key,
    client_name VARCHAR(100) not null, 
    client_cp varchar(5),  
    client_city varchar(50), 
    client_colony varchar(50), 
    client_street varchar(50), 
    client_number varchar(5), 
    client_reference varchar(100), 
    client_phone varchar(10), 
    client_email varchar(50), 
    client_origin varchar(50), 
    client_username varchar(50)
);

CREATE TABLE products (
    product_id varchar(50) primary key,
    product_name varchar (50) not null,
    product_description text,
    product_quantity int, 
    product_price int,
    product_price_5 int,
    product_price_10 int
);

create table productphotos (
    productphoto_id varchar(50) primary key,
    productphoto_image varchar(100),
    product_id varchar(50),
    constraint fk_product foreign key(product_id) references products(product_id)
);

create table permissions (
    permission_id varchar(50) primary key,
    permission_name varchar (50),
    permission_description text
);

create table users (
    user_id varchar(50) primary key,
    user_name varchar(50), 
    user_lastname varchar(50), 
    user_username varchar(50), 
    user_email varchar(50) 
);

create table auths (
    auth_id varchar(50) primary key,
    auth_username varchar(50), 
    auth_password varchar(100),
    permission_id varchar(50),
    constraint fk_permission foreign key(permission_id) references permissions(permission_id),
    constraint fk_user foreign key(auth_id) references users(user_id)
);

create table shipments (
    shipment_id varchar(50) primary key,
    shipment_parcel varchar(50),
    shipment_code varchar(100),
    shipment_code_made BOOLEAN not null default false,
    shipment_send BOOLEAN not null default false,
    shipment_ready BOOLEAN not null default false
);

create table payments (
    payment_id varchar(50) primary key,
    payment_advance int,
    payment_remaining int
);

create table voucherphotos (
    voucherphoto_id varchar(50) primary key,
    voucherphoto_image varchar(100),
    payment_id varchar(50),
    constraint fk_payment foreign key(payment_id) references payments(payment_id)
);

CREATE TABLE orders (
    order_id varchar(50) primary key,
    client_id varchar(50),
    product_id varchar(50),
    user_id varchar(50),
    shipment_id varchar(50),
    payment_id varchar(50),
    order_date date NOT NULL, 
    order_note text, 
    order_design BOOLEAN NOT NULL default false, 
    order_revision BOOLEAN NOT NULL default false, 
    order_elaborated BOOLEAN NOT NULL default false, 
    order_photo_sent BOOLEAN NOT NULL default false,
    order_paid BOOLEAN NOT NULL default false,
    order_guide_sent BOOLEAN NOT NULL default false,
    constraint fk_client foreign key(client_id) references clients(client_id),
    constraint fk_product foreign key(product_id) references products(product_id),
    constraint fk_user foreign key(user_id) references users(user_id),
    constraint fk_shipment foreign key(shipment_id) references shipments(shipment_id),
    constraint fk_payment foreign key(payment_id) references payments(payment_id)
);

create table orderphotos (
    orderphoto_id varchar(50) primary key,
    orderphoto_image varchar(100),
    order_id varchar(50),
    constraint fk_order foreign key(order_id) references orders(order_id)
);

create table texts (
    text_id varchar(50) primary key,
    text_text text,
    text_position varchar(50),
    order_id varchar(50),
    constraint fk_order foreign key(order_id) references orders(order_id)
);

create table clientphotos (
    clientphoto_id varchar(50) primary key,
    clientphoto_image varchar(100),
    order_id varchar(50),
    constraint fk_order foreign key(order_id) references orders(order_id)
);

create table designphotos (
    desingphoto_id varchar(50) primary key,
    desingphoto_image varchar(100),
    clientphoto_id varchar(50),
    user_id varchar(100),
    constraint fk_user foreign key(user_id) references users(user_id),
    constraint fk_clientphoto foreign key(clientphoto_id) references clientphotos(clientphoto_id)
);

create table spotifys (
    spotify_id varchar(50) primary key,
    spotify_song varchar(50),
    spotify_author varchar(50),
    order_id varchar(50),
    constraint fk_order foreign key(order_id) references orders(order_id)
);