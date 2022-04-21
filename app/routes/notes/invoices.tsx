import type {
    LinksFunction,
    LoaderFunction,
} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import type { Note } from "@prisma/client";
import { db } from "~/utils/db.server";
import invoiceStyles from "~/styles/invoice.css";

export const links: LinksFunction = () => {
    return [
        {
            rel: "stylesheet",
            href: invoiceStyles,
        },
    ];
};

type LoaderData = { randomNote: Note };

export const loader: LoaderFunction = async () => {
    const count = await db.note.count();
    const randomRowNumber = Math.floor(Math.random() * count);
    const [randomNote] = await db.note.findMany({
        take: 1,
        skip: randomRowNumber
    });
    const data: LoaderData = { randomNote };
    return data;
};

const ColoredLine = () => (
    <hr
        style={{
            color: 'red',
            backgroundColor: 'red',
            height: 5
        }}
    />
);

export default function NoteCard() {
    const data = useLoaderData<LoaderData>();

    return (
        <>
        <div className="container mt-5 mb-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-10">
                    <div className="receipt bg-white p-3 rounded">
                        <img src="https://i.imgur.com/zCAnG06.png"
                                                                       width="120" />
                        <h4 className="mt-2 mb-3">Your order is confirmed!</h4>
                        <h6 className="name">Hello John,</h6><span className="fs-12 text-black-50">your order has been confirmed and will be shipped in two days</span>
                        <ColoredLine />
                            <div className="d-flex flex-row justify-content-between align-items-center order-details">
                                <div><span className="d-block fs-12">Order date</span><span
                                    className="font-weight-bold">12 March 2020</span></div>
                                <div><span className="d-block fs-12">Order number</span><span
                                    className="font-weight-bold">OD44434324</span></div>
                                <div><span className="d-block fs-12">Payment method</span><span
                                    className="font-weight-bold">Credit card</span><img className="ml-1 mb-1"
                                                                                        src="https://i.imgur.com/ZZr3Yqj.png"
                                                                                        width="20" /></div>
                                <div><span className="d-block fs-12">Shipping Address</span><span
                                    className="font-weight-bold text-success">New Delhi</span></div>
                            </div>
                            <ColoredLine />
                                <div className="d-flex justify-content-between align-items-center product-details">
                                    <div className="d-flex flex-row product-name-image"><img className="rounded"
                                                                                             src="https://i.imgur.com/GsFeDLn.jpg"
                                                                                             width="80" />
                                        <div className="d-flex flex-column justify-content-between ml-2">
                                            <div><span className="d-block font-weight-bold p-name">Ralco formal shirts for men</span><span
                                                className="fs-12">Clothes</span></div>
                                            <span className="fs-12">Qty: 1pcs</span>
                                        </div>
                                    </div>
                                    <div className="product-price">
                                        <h5>$70</h5>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center product-details">
                                    <div className="d-flex flex-row product-name-image"><img className="rounded"
                                                                                             src="https://i.imgur.com/b7Ve3fJ.jpg"
                                                                                             width="80" />
                                        <div className="d-flex flex-column justify-content-between ml-2">
                                            <div><span className="d-block font-weight-bold p-name">Ralco formal Belt for men</span><span
                                                className="fs-12">Accessories</span></div>
                                            <span className="fs-12">Qty: 1pcs</span>
                                        </div>
                                    </div>
                                    <div className="product-price">
                                        <h6>$50</h6>
                                    </div>
                                </div>
                                <div className="mt-5 amount row">
                                    <div className="d-flex justify-content-center col-md-6"><img
                                        src="https://i.imgur.com/AXdWCWr.gif" width="250" height="100" /></div>
                                    <div className="col-md-6">
                                        <div className="billing">
                                            <div className="d-flex justify-content-between"><span>Subtotal</span><span
                                                className="font-weight-bold">$120</span></div>
                                            <div className="d-flex justify-content-between mt-2">
                                                <span>Shipping fee</span><span className="font-weight-bold">$15</span>
                                            </div>
                                            <div className="d-flex justify-content-between mt-2"><span>Tax</span><span
                                                className="font-weight-bold">$5</span></div>
                                            <div className="d-flex justify-content-between mt-2"><span
                                                className="text-success">Discount</span><span
                                                className="font-weight-bold text-success">$25</span></div>
                                            <ColoredLine />
                                                <div className="d-flex justify-content-between mt-1"><span
                                                    className="font-weight-bold">Total</span><span
                                                    className="font-weight-bold text-success">$165</span></div>
                                        </div>
                                    </div>
                                </div>
                                <span className="d-block">Expected delivery date</span><span
                                className="font-weight-bold text-success">12 March 2020</span><span
                                className="d-block mt-3 text-black-50 fs-15">We will be sending a shipping confirmation email when the item is shipped!</span>
                                <ColoredLine />
                                    <div className="d-flex justify-content-between align-items-center footer">
                                        <div className="thanks"><span className="d-block font-weight-bold">Thanks for shopping</span><span>Amazon team</span>
                                        </div>
                                        <div className="d-flex flex-column justify-content-end align-items-end"><span
                                            className="d-block font-weight-bold">Need Help?</span><span>Call - 974493933</span>
                                        </div>
                                    </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
