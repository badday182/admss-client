import { getInventoryMediaItem } from "./../../../http/services/media.service";
import { Status } from "common/models/base-response";
import { Contact, ContactExtData } from "common/models/contact";
import { MediaType } from "common/models/enums";
import {
    deleteContactDL,
    getContactInfo,
    setContactDL,
    setContact,
} from "http/services/contacts-service";
import { createMediaItemRecord, uploadInventoryMedia } from "http/services/media.service";
import { action, makeAutoObservable } from "mobx";
import { RootStore } from "store";

export type DLSide = "front" | "back";

export class ContactStore {
    public rootStore: RootStore;
    private _contact: Contact = {} as Contact;
    private _contactExtData: ContactExtData = {} as ContactExtData;
    private _contactID: string = "";
    protected _isLoading = false;
    private _frontSiteDLurl: string = "";
    private _backSiteDLurl: string = "";
    private _frontSiteDL: File = {} as File;
    private _backSiteDL: File = {} as File;

    public constructor(rootStore: RootStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }

    public get contact() {
        return this._contact;
    }

    public get contactExtData() {
        return this._contactExtData;
    }

    public get frontSideDL() {
        return this._frontSiteDL;
    }

    public get backSideDL() {
        return this._backSiteDL;
    }

    public get frontSideDLurl() {
        return this._frontSiteDLurl;
    }

    public get backSideDLurl() {
        return this._backSiteDLurl;
    }

    public get isLoading() {
        return this._isLoading;
    }

    public set isLoading(state: boolean) {
        this._isLoading = state;
    }

    public getContact = async (itemuid: string) => {
        this._isLoading = true;
        try {
            const response = await getContactInfo(itemuid);
            if (response) {
                const { extdata, ...contact } = response as Contact;

                this._contactID = contact.contactuid;

                this._contact = contact || ({} as Contact);
                this._contactExtData = extdata || ({} as ContactExtData);
            }
        } catch (error) {
        } finally {
            this._isLoading = false;
        }
    };

    public getImagesDL = (): void => {
        if (this._contact.dluidfront) {
            getInventoryMediaItem(this._contact.dluidfront).then((res) => {
                if (res) {
                    this._frontSiteDLurl = res;
                }
            });
        }
        if (this._contact.dluidback) {
            getInventoryMediaItem(this._contact.dluidback).then((res) => {
                if (res) {
                    this._backSiteDLurl = res;
                }
            });
        }
    };

    public changeContact = action(
        (key: keyof Omit<Contact, "extdata">, value: string | number | string[]) => {
            this._contact[key] = value as never;
        }
    );

    public changeContactExtData = action((key: keyof ContactExtData, value: string | number) => {
        this._contactExtData[key] = value as never;
    });

    private setImagesDL = async (): Promise<any> => {
        this._isLoading = true;
        try {
            [this._frontSiteDL, this._backSiteDL].forEach(async (file, index) => {
                if (file.size) {
                    const formData = new FormData();
                    formData.append("file", file);

                    const createMediaResponse = await createMediaItemRecord(MediaType.mtPhoto);
                    if (createMediaResponse?.status === Status.OK) {
                        const uploadMediaResponse = await uploadInventoryMedia(
                            createMediaResponse.itemUID,
                            formData
                        );
                        if (uploadMediaResponse?.status === Status.OK) {
                            await setContactDL(this._contactID, {
                                [!index ? "dluidfront" : "dluidback"]: uploadMediaResponse.itemuid,
                            });
                        }
                    }
                }
            });
        } catch (error) {
            // TODO: add error handler
        } finally {
            this._isLoading = false;
        }
    };

    public saveContact = action(async (): Promise<string | undefined> => {
        try {
            this._isLoading = true;
            const contactData: Contact = {
                ...this.contact,
                extdata: this.contactExtData,
            };
            const contactDataResponse = await setContact(this._contactID, contactData);
            const imagesResponse = await this.setImagesDL();
            await Promise.all([contactDataResponse, imagesResponse]).then((response) =>
                response.every((item) => item?.status === Status.OK) ? this._contactID : undefined
            );
        } catch (error) {
            // TODO: add error handlers
            return undefined;
        } finally {
            this._isLoading = false;
        }
    });

    public set frontSideDL(file: File) {
        this._frontSiteDL = file;
    }

    public set backSideDL(file: File) {
        this._backSiteDL = file;
    }

    public removeImagesDL = async (): Promise<any> => {
        this._isLoading = true;
        try {
            await deleteContactDL(this._contactID);
            this._frontSiteDLurl = "";
            this._backSiteDLurl = "";
            return Status.OK;
        } catch (error) {
            return Status.ERROR;
        } finally {
            this._isLoading = false;
        }
    };

    public clearContact = () => {
        this._contact = {} as Contact;
        this._contactID = "";
        this._frontSiteDLurl = "";
        this._backSiteDLurl = "";
        this._frontSiteDL = {} as File;
        this._backSiteDL = {} as File;
        this._contactExtData = {} as ContactExtData;
    };
}
