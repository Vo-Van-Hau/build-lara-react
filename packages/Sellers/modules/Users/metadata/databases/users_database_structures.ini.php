<?php

 return [
    "users" => [
        "fields" => [
            "name" =>
            array (
                "type" => "VARCHAR",
                "size" => 255,
                "not_null" => false,
            ),
            "description" =>
            array (
                "type" => "TEXT",
                "not_null" => false,
            ),
            "status" =>
            array (
                "type" => "INTEGER",
                "not_null" => false,
            ),
            "publisher_id" =>
            array (
                "type" => "INTEGER",
                "not_null" => false,
            ),
            "date_export" =>
            array (
                "type" => "DATETIME",
                "not_null" => false,
            ),
            "date_approve" =>
            array (
                "type" => "DATETIME",
                "not_null" => false,
            ),
            "date_invoice" =>
            array (
                "type" => "DATETIME",
                "not_null" => false,
            ),
            "company_info" =>
            array (
                "type" => "TEXT",
                "not_null" => false,
            ),
            "publisher_info" =>
            array (
                "type" => "TEXT",
                "not_null" => false,
            ),
            "day" =>
            array (
                "type" => "VARCHAR",
                "size" => 4,
                "not_null" => false,
                "default" => "1",
            ),
            "month" =>
            array (
                "type" => "VARCHAR",
                "size" => 4,
                "not_null" => false,
            ),
            "year" =>
            array (
                "type" => "VARCHAR",
                "size" => 6,
                "not_null" => false,
            ),
            "publisher_view" =>
            array (
                "type" => "INTEGER",
                "size" => 11,
                "not_null" => false,
            ),
            "vat" =>
            array (
                "type" => "VARCHAR",
                "size" => 255,
                "not_null" => false,
            ),
        ]
    ],
];
